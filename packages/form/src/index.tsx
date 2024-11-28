import React from "react";
import {z} from "zod";
import {Store, useStore} from "@tanstack/react-store";
import {
    createNewFields,
    getRawFieldsData,
    TCreateFieldMetaProps,
    TFieldName,
    TFields,
    TFieldValue,
} from "./field.js";


type TFieldRender = (props: {
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) => React.ReactNode

type TFieldComponentProps<T extends TFieldName> = {
    name: T,
    render: TFieldRender,
    linkedValidations?: T[]
}

type TFormValidators = {
    onChange?: ReturnType<typeof z.object> | z.ZodEffects<z.ZodObject<any>>
}

type TUseFormProps<T extends TFieldName> = {
    fields: Record<T, TCreateFieldMetaProps>
    validators?: TFormValidators,
}


export const useForm = <T extends TFieldName>(props: TUseFormProps<T>) => {
    const fieldsStore = new Store(createNewFields(props.fields))
    function useSelector<TResult>(selector: (state: typeof fieldsStore['state']) => TResult): TResult {
        return useStore(fieldsStore, selector);
    }

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

    const validate = (props: {
        fields: TFields<any>,
        validationFunction: z.ZodObject<any>['safeParse']
    }) => {
        const rawValues = getRawFieldsData(props.fields)
        const res = props.validationFunction(rawValues)
        Object.keys(props.fields).forEach((key) => {
            setFieldErrors(key as T, [])
        })
        if (res?.error) {
            res.error.issues.map((i)=>{
                setFieldErrors(i.path[0] as T, [i.message])
            })
        } else {
        }
    }

    const Field = (fieldProps: TFieldComponentProps<T>) => {

        const fieldMeta = useSelector((state)=> state[fieldProps.name])
        const fields = useSelector((state)=> state)

        return fieldProps.render({
            value: fieldMeta.value || "",
            onChange: (e) => {
                const newFields = {
                    ...fields,
                    [fieldProps.name]: {
                        ...fieldMeta,
                        value: e.target.value
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



    return {
        Field,
        useSelector,
        setFieldErrors,
    }

}

