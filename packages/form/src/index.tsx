import React, {useState} from "react";

export type TFieldValue = string
export type TFieldName = string

export type TFieldMeta = {
    value: TFieldValue;
    errors: string[];
    touched: boolean
}

export type TCreateFieldMetaProps = {
    initialValue?: TFieldValue
}

export const createFieldMeta = (props: TCreateFieldMetaProps): TFieldMeta => {
    return {
        value: props.initialValue ?? "",
        errors: [],
        touched: false
    }
}

export type TUseFieldMetaProps = {
    initialValue?: TFieldValue
}

export type TField = {
    fieldMeta: TFieldMeta
    setFieldMeta: React.Dispatch<TFieldMeta>
}

export const useFieldMeta = (props: TUseFieldMetaProps) => {
    return useState(createFieldMeta(props))
}

export type TSetFieldMeta = (fieldMeta: TFieldMeta) => void

export type TUseFormProps = {
    fields: Record<TFieldName, TCreateFieldMetaProps>
}

export const createField = (props: TCreateFieldMetaProps) => {
    const fieldMeta = useFieldMeta(props)
    return {
        fieldMeta: fieldMeta[0],
        setFieldMeta: fieldMeta[1],
    }
}

export const createNewFields = (fields: Record<TFieldName, TCreateFieldMetaProps>) => {
    const newFields: Record<TFieldName, TField> = {}

    for (const [key, value] of Object.entries(fields)) {
        newFields[key] = createField(value)
    }

    return newFields
}


export type TFieldRender = (props:{
    value: TFieldValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => React.ReactNode

export type TFieldComponentProps<TName extends TFieldName> = {
    field: TField,
    render: TFieldRender,
}

const Field = (props: TFieldComponentProps<TFieldName>) => {
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

export const useForm = (props: TUseFormProps) => {
    const fields = createNewFields(props.fields)
    const [state, setState] = useState('')

    return {
        fields,
        Field
    }
}