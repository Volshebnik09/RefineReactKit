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
export type TFields<T extends TFieldName> = Record<T, TFieldMeta>

export const createFieldMeta = (props: TCreateFieldMetaProps): TFieldMeta => {
    return {
        value: props.initialValue ?? "",
        errors: [],
        touched: false,
        isValid: props.isValid ?? true
    }
}


export const createField = (props: TCreateFieldMetaProps): TFieldMeta => {
    return createFieldMeta(props)
}

export const createNewFields = <T extends TFieldName>(fields: Record<T, TCreateFieldMetaProps>): TFields<T> => {
    return Object.keys(fields)
        .reduce<Record<T, TFieldMeta>>((acc, key) => {
            acc[key as T] = createField(fields[key as T]);
            return acc;
        }, {} as Record<T, TFieldMeta>);
}

export type TRawFieldsData = Record<TFieldName, TFieldValue>

export const getRawFieldsData = (fields: TFields<any>):TRawFieldsData => {

    const fieldKeys = Object.keys(fields)

    return fieldKeys.reduce((acc, key) => {
        acc[key] = fields[key]?.value || ""
        return acc
    }, {} as Record<TFieldName, TFieldValue>)
}
