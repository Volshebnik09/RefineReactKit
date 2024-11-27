import React, {useState} from "react";

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

export type TField = {
    fieldMeta: TFieldMeta
    setFieldMeta: TSetFieldMeta
}

export const useFieldMeta = (props: TUseFieldMetaProps) => {
    return useState(createFieldMeta(props))
}


export const createField = (props: TCreateFieldMetaProps) => {
    const fieldMeta = useFieldMeta(props)
    return {
        fieldMeta: fieldMeta[0],
        setFieldMeta: fieldMeta[1],
    }
}

export type Fields<T extends TFieldName> = Record<T, TField>

export const createNewFields = <T extends TFieldName>(fields: Record<T, TCreateFieldMetaProps>): Fields<T> => {
    return Object.keys(fields)
        .reduce<Record<T, TField>>((acc, key) => {
            acc[key as T] = createField(fields[key as T]);
            return acc;
        }, {} as Record<T, TField>);
}


export type TFieldRender = (props: {
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => React.ReactNode

export type TFieldComponentProps = {
    field: TField,
    render: TFieldRender,
}

const Field = (props: TFieldComponentProps) => {
    const field = props.field || createField({
        initialValue: ""
    })

    return props.render({
        value: field?.fieldMeta?.value,
        onChange: (e) => {
            field?.setFieldMeta({
                ...field?.fieldMeta,
                value: e.target.value
            })
        }
    })
}

export type TFormValidators = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export type TGetFormFieldProps = {
    validators: TFormValidators
}


export type TUseFormProps<T extends TFieldName> = {
    fields: Record<T, TCreateFieldMetaProps>
    validators?: TFormValidators
}

export const useForm = <T extends TFieldName>(props: TUseFormProps<T>) => {
    const fields = createNewFields(props.fields)

    return {
        fields,
        Field
    }
}

