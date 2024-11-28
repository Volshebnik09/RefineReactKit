import React from "react";
import {z} from "zod";
import {Store, useStore} from "@tanstack/react-store";
import {
    createNewFields,
    getRawFieldsData,
    TFieldMeta,
    TFieldName,
    TFields, TFieldsToCreate,
    TFieldValue,
} from "./field.js";


type TFieldRender = (props: {
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    fieldMeta: TFieldMeta
}) => React.ReactNode

type TFieldComponentProps<T extends TFieldName> = {
    name: T,
    render: TFieldRender,
    linkedValidations?: T[]
}

type TFormValidators = {
    onChange?:  z.ZodObject<any> | z.ZodEffects<any>
    onMount?: z.ZodObject<any> | z.ZodEffects<any>
}

type TUseFormProps<T extends TFieldName> = {
    fields: TFieldsToCreate<T>
    validators?: TFormValidators,
}


const getRawValues = (props: {
    formRef: React.RefObject<HTMLFormElement>,
    fields: TFields<any>
}) => {
    if (props.formRef.current) {
        const formData = new FormData(props.formRef.current as HTMLFormElement)

        return Object.fromEntries(formData.entries());
    } else {
        return getRawFieldsData(props.fields)
    }
}

export const useForm = <T extends TFieldName>(props: TUseFormProps<T>) => {
    const fieldsStore = new Store(createNewFields({fields:props.fields}))
    function useSelector<TResult>(selector: (state: typeof fieldsStore['state']) => TResult): TResult {
        return useStore(fieldsStore, selector);
    }
    const formRef = React.useRef<HTMLFormElement>(null)

    const setFieldErrors = (name: T, errors: string[]) => {
        fieldsStore.setState((fields) => {
            return {
                ...fields,
                [name]: {
                    ...fields[name],
                    errors: errors
                }
            }
        })
    }

    const appendErrors = (name: T, errors: string[]) => {
        fieldsStore.setState((fields) => {
            const set = new Set([...fields[name].errors, ...errors])
            return {
                ...fields,
                [name]: {
                    ...fields[name],
                    errors: Array.from(set)
                }
            }
        })
    }


    const validate = (props: {
        fields: TFields<any>,
        validationFunction: z.ZodObject<any>['safeParse']
    }) => {

        const rawValues = getRawValues({
            formRef: formRef,
            fields: props.fields
        })
        const res = props.validationFunction(rawValues)
        Object.keys(props.fields).forEach((key) => {
            setFieldErrors(key as T, [])
        })
        if (res?.error) {
            res.error.issues.map((i)=>{
                appendErrors(i.path[0] as T, [i.message])
            })
        } else {
        }
    }

    const Field = (fieldProps: TFieldComponentProps<T>) => {

        const fieldMeta = useSelector((state)=> state[fieldProps.name])
        const fields = useSelector((state)=> state)

        return fieldProps.render({
            value: fieldMeta.value || "",
            fieldMeta: fieldMeta,
            onChange: (e) => {
                const newFields = {
                    ...fields,
                    [fieldProps.name]: {
                        ...fieldMeta,
                        value: e.target.value,
                        touched: true
                    }
                }
                fieldsStore.setState(()=>newFields)

                if (props.validators?.onChange) {
                    validate({
                        fields: newFields,
                        validationFunction: props.validators.onChange.safeParse
                    })
                }

            }
        })
    }

    const useCanSubmit = () => {
        const fields = useSelector((state) => state)
        const fieldKeys = Object.keys(fields)
        return fieldKeys.every((key) => fields[key as T].errors.length === 0)
    }

    if (props.validators?.onMount) {
        validate({
            fields: fieldsStore.state,
            validationFunction: props.validators.onMount.safeParse
        })
    }


    return {
        formRef,
        Field,
        useSelector,
        setFieldErrors,
        useCanSubmit,
    } as const
}

export type TForm <T extends TFieldName = any> = ReturnType<typeof useForm<T>>

export type {
    TFieldsToCreate
}