import React, {useEffect, useMemo} from "react";
import {z, ZodError} from "zod";
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
    onChange?: z.ZodObject<any> | z.ZodEffects<any>
    onMount?: z.ZodObject<any> | z.ZodEffects<any>
    beforeSubmit?: z.ZodObject<any> | z.ZodEffects<any>
}

type TUseFormProps<T extends TFieldName> = {
    fields: TFieldsToCreate<T>
    validators?: TFormValidators,
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
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
    const fieldsStore = useMemo(() => new Store(createNewFields({fields: props.fields})), []);

    function useSelector<TResult>(selector: (state: typeof fieldsStore['state']) => TResult): TResult {
        return useStore(fieldsStore, selector);
    }

    const formRef = React.useRef<HTMLFormElement>(null)

    const setFieldErrors = (name: T, errors: string[], forceTouch?: boolean) => {
        fieldsStore.setState((fields) => {
            return {
                ...fields,
                [name]: {
                    ...fields[name],
                    errors: errors,
                    touched: forceTouch ? true : fields[name].touched
                }
            }
        })
    }

    const appendErrors = (name: T, errors: string[], forceTouch?: boolean) => {
        fieldsStore.setState((fields) => {
            const set = new Set([...fields[name].errors, ...errors])
            return {
                ...fields,
                [name]: {
                    ...fields[name],
                    errors: Array.from(set),
                    touched: forceTouch ? true : fields[name].touched
                }
            }
        })
    }


    const validate = (props: {
        fields: TFields<any>,
        validationFunction: z.ZodObject<any>['safeParse'],
        forceTouch?: boolean
    }) => {
        Object.keys(props.fields).forEach((key) => {
            setFieldErrors(key as T, [])
        })

        const rawValues = getRawValues({
            formRef: formRef,
            fields: props.fields
        })
        const res = props.validationFunction(rawValues)
        if (res?.error) {
            res.error.issues.map((i) => {
                appendErrors(i.path[0] as T, [i.message],props.forceTouch)
            })
            return res?.error
        }
    }

    const Field = (fieldProps: TFieldComponentProps<T>) => {

        const fieldMeta = useSelector((state) => state[fieldProps.name])
        const fields = useSelector((state) => state)

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
                fieldsStore.setState(() => newFields)

                if (props.validators?.onChange) {
                    validate({
                        fields: newFields,
                        validationFunction: props.validators.onChange.safeParse
                    })
                } else {
                    setFieldErrors(fieldProps.name, [])
                }

            }
        })
    }

    const useCanSubmit = () => {
        const fields = useSelector((state) => state)
        const fieldKeys = Object.keys(fields)
        return fieldKeys.every((key) => fields[key as T].errors.length === 0)
    }

    useEffect(()=>{
        if (props.validators?.onMount) {
            validate({
                fields: fieldsStore.state,
                validationFunction: props.validators.onMount.safeParse
            })
        }
    }, [])

    const onSubmit = (onSubmitProps: {
        fields: TFields<T>,
        e: React.FormEvent<HTMLFormElement>
    }) => {
        onSubmitProps.e.preventDefault()

        let errors: ZodError<{ [x: string]: any; }> | undefined = undefined
        if (props.validators?.beforeSubmit) {
            errors = validate({
                fields: onSubmitProps.fields,
                validationFunction: props.validators?.beforeSubmit.safeParse,
                forceTouch: true
            })
        }

        if (!errors) {
            if (props.onSubmit) {
                props.onSubmit(onSubmitProps.e)
            }
        }
    }

    const Form = (formProps: React.FormHTMLAttributes<HTMLFormElement>) => {
        const fields = useSelector((state) => state)
        return <form
            {...formProps}
            ref={formRef}
            onSubmit={(e)=>{
                onSubmit({
                    fields,
                    e
                })
            }}
        />

    }


    return {
        formRef,
        Field: React.useMemo(() => Field, []),
        Form: React.useMemo(() => Form, []),
        useSelector,
        setFieldErrors,
        useCanSubmit,
    } as const
}

export type TForm<T extends TFieldName = any> = ReturnType<typeof useForm<T>>