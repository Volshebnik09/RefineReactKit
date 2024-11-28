import React, {useContext, useRef, useState} from "react";
import {z} from "zod";
import {Store, useStore} from "@tanstack/react-store";

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
    const fieldsStore = new Store(createNewFields(props.fields))
    const useSelector = (selector: (fields: TFields<T>) => any) => {
        return useStore(fieldsStore, selector)
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

    const Field = (fieldProps: TFieldComponentProps<T>) => {


        const fieldMeta = useSelector((state)=> state[fieldProps.name])
        const fields= useStore(fieldsStore, (state)=> state)

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

                const rawValues = getRawFieldsData(newFields)
                const res = props.validators?.onChange?.safeParse(rawValues)
                setFieldErrors(fieldProps.name, [])
                if (res?.error) {
                    setFieldErrors(fieldProps.name, res.error.issues.map((i)=>i.message))
                }
            }
        })
    }

    return {
        Field,
        useSelector,
    }

}

