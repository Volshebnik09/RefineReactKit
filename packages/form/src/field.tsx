import {useStore} from "@tanstack/react-store";
import React from "react";
import {TFormCore} from "./core.js";

export type TFieldValue = string | File
export type TFieldName = string

export type TFieldMeta<T extends TFieldName> = {
    value: TFieldValue;
    errors: string[];
    touched: boolean
    name: T
}

export type TCreateFieldMetaProps = {
    initialValue?: TFieldValue
    name: TFieldName
}
export type TFields<T extends TFieldName> = Record<T, TFieldMeta<T>>

export const createFieldMeta = <T extends TFieldName>(props: TCreateFieldMetaProps): TFieldMeta<T> => {
    return {
        value: props.initialValue ?? "",
        errors: [],
        touched: false,
        name: props.name as T
    }
}

export const createField  = <T extends TFieldName>(props: TCreateFieldMetaProps): TFieldMeta<T> => {
    return createFieldMeta(props)
}

export type TFieldsToCreate<T extends TFieldName> = Record<T, {
    initialValue?: TFieldValue
}>

export type TCreateNewFieldsProps<T extends TFieldName> = {
    fields: TFieldsToCreate<T>
}

export const createNewFields = <T extends TFieldName>(props: TCreateNewFieldsProps<T>): TFields<T> => {
    return Object.keys(props.fields)
        .reduce<Record<T, TFieldMeta<T>>>((acc, key) => {
            acc[key as T] = createField({
                name: key,
                ...props.fields[key as T],
            });
            return acc;
        }, {} as Record<T, TFieldMeta<T>>);
}

export type TRawFieldsData = Record<TFieldName, TFieldValue>

export const getRawFieldsData = (fields: TFields<any>): TRawFieldsData => {

    const fieldKeys = Object.keys(fields)

    return fieldKeys.reduce((acc, key) => {
        acc[key] = fields[key]?.value || ""
        return acc
    }, {} as Record<TFieldName, TFieldValue>)
}

export type TFieldRender = <T extends TFieldName>(props: {
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    fieldMeta: TFieldMeta<T>,
}) => React.ReactNode


export type TFieldComponentProps<T extends TFieldName> = {
    name: T,
    render: TFieldRender,
    linkedValidations?: T[]
}

type TCreateItemProps<T extends TFieldName>= {
    core: TFormCore<T>
}

export const createReactItem = <T extends TFieldName>(props: TCreateItemProps<T>) =>
    (itemProps: TFieldComponentProps<T>) => {
        const fieldMeta = useStore(props.core.store, (state) => state.fields[itemProps.name])

        return itemProps.render({
            value: fieldMeta.value || "",
            fieldMeta: fieldMeta,
            onChange: (e) => {
                const newFieldMeta = {
                    ...fieldMeta,
                    value: e.target.value,
                    touched: true
                }

                props.core.updateField({
                    fieldMeta: newFieldMeta
                })

                if (props.core.store.state.validators?.onChange) {
                    props.core.validateFields({
                        validationFunction: props.core.store.state.validators.onChange.safeParse,
                    })
                }
            }
        })
    }
