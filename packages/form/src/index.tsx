import React, {useContext, useRef, useState} from "react";
import {z} from "zod";

export type TFieldValue = string
export type TFieldName = string

export type TFieldMeta = {
    value: TFieldValue;
    errors: string[];
    touched: boolean
    isValid: boolean
}

export type TCreateFieldMetaProps = {
    initialValue?: TFieldValue
    isValid?: boolean
}

export const createFieldMeta = (props: TCreateFieldMetaProps): TFieldMeta => {
    return {
        value: props.initialValue ?? "",
        errors: [],
        touched: false,
        isValid: props.isValid ?? true
    }
}

export type TUseFieldMetaProps = {
    initialValue?: TFieldValue
}

export type TSetFieldMeta = (fieldMeta: TFieldMeta) => void

export const createField = (props: TCreateFieldMetaProps): TFieldMeta => {
    return createFieldMeta(props)
}

export type TFields<T extends TFieldName> = Record<T, TFieldMeta>

export const createNewFields = <T extends TFieldName>(fields: Record<T, TCreateFieldMetaProps>): TFields<T> => {
    return Object.keys(fields)
        .reduce<Record<T, TFieldMeta>>((acc, key) => {
            acc[key as T] = createField(fields[key as T]);
            return acc;
        }, {} as Record<T, TFieldMeta>);
}


export type TFieldRender = (props: {
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) => React.ReactNode

export type TFieldComponentProps<T extends TFieldName> = {
    name: T,
    render: TFieldRender,
}


export type TFormValidators = {
    onChange?: ReturnType<typeof z.object>

}

export type TGetFormFieldProps = {
    validators: TFormValidators
}


export type TUseFormProps<T extends TFieldName> = {
    fields: Record<T, TCreateFieldMetaProps>
    validators?: TFormValidators
}


const FormContext = React.createContext<{
    fields: TFields<TFieldName>
    setFields: React.Dispatch<React.SetStateAction<TFields<any>>>
} | null>(null)


export const getRawFieldsData = (fields: TFields<any>) => {

    const fieldKeys = Object.keys(fields)

    return fieldKeys.reduce((acc, key) => {
        acc[key] = fields[key]?.value || ""
        return acc
    }, {} as Record<TFieldName, TFieldValue>)
}


export const useForm = <T extends TFieldName>(props: TUseFormProps<T>) => {
    const newFields = createNewFields(props.fields)

    const Form = (props: React.InputHTMLAttributes<HTMLFormElement>) => {

        const [fields, setFields] = useState(() => newFields)

        return <FormContext.Provider value={{
            fields,
            setFields
        }}>
            <form {...props}/>
        </FormContext.Provider>
    }

    const Field = (fieldProps: TFieldComponentProps<T>) => {
        const formContext = useContext(FormContext)

        if (!formContext) {
            throw new Error('FieldsContext is not provided')
        }

        const fieldMeta = formContext.fields[fieldProps.name]

        if (!fieldMeta) {
            throw new Error(`Field ${fieldProps.name} not found`)
        }


        return fieldProps.render({
            value: fieldMeta.value || "",
            onChange: (e) => {
                formContext.setFields((fields) => {
                    return {
                        ...fields,
                        [fieldProps.name]: {
                            ...fieldMeta,
                            value: e.target.value
                        }
                    }
                })

                const rawValues = getRawFieldsData(formContext.fields)

                const res = props.validators?.onChange?.safeParse(getRawFieldsData(formContext.fields))
                if (res?.error) {
                    formContext.setFields((fields) => {
                        return {
                            ...fields,
                            [fieldProps.name]: {
                                ...fieldMeta,
                                value: e.target.value,
                                errors: [res.error.message]
                            }
                        }
                    })
                }
            }
        })

    }

    return {
        Form,
        Field,
    }

}

