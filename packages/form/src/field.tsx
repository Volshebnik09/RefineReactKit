export type TFieldValue = string
export type TFieldName = string

export type TFieldMeta = {
    value: TFieldValue;
    errors: string[];
    touched: boolean
    name: TFieldName
}

export type TCreateFieldMetaProps = {
    initialValue?: TFieldValue
    isValid?: boolean
    name: TFieldName
}
export type TFields<T extends TFieldName> = Record<T, TFieldMeta>

export const createFieldMeta = (props: TCreateFieldMetaProps): TFieldMeta => {
    return {
        value: props.initialValue ?? "",
        errors: [],
        touched: false,
        name: props.name
    }
}

export const createField = (props: TCreateFieldMetaProps): TFieldMeta => {
    return createFieldMeta(props)
}

export type TFieldsToCreate<T extends TFieldName> = Record<T, {
    initialValue?: TFieldValue
    isValid?: boolean
}>

export type TCreateNewFieldsProps<T extends TFieldName> = {
    fields: TFieldsToCreate<T>
}

export const createNewFields = <T extends TFieldName>(props: TCreateNewFieldsProps<T>): TFields<T> => {
    return Object.keys(props.fields)
        .reduce<Record<T, TFieldMeta>>((acc, key) => {
            acc[key as T] = createField({
                name: key,
                ...props.fields[key as T],
            });
            return acc;
        }, {} as Record<T, TFieldMeta>);
}

export type TRawFieldsData = Record<TFieldName, TFieldValue>

export const getRawFieldsData = (fields: TFields<any>): TRawFieldsData => {

    const fieldKeys = Object.keys(fields)

    return fieldKeys.reduce((acc, key) => {
        acc[key] = fields[key]?.value || ""
        return acc
    }, {} as Record<TFieldName, TFieldValue>)
}
