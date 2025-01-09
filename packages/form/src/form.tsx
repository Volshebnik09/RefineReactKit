import {TFormCore} from "./core.js";
import {getRawFieldsData, TFieldName, TFields} from "./field.js";
import React, {useEffect} from "react";

type TCreateReactFormProps<T extends TFieldName> = {
    core: TFormCore<T>
}

export type TOnSubmit = (e: React.FormEvent<HTMLFormElement>) => Promise<void>

export const createReactForm = <T extends TFieldName>(props: TCreateReactFormProps<T>) =>
    (formProps: React.FormHTMLAttributes<HTMLFormElement>) => {
        const formRef = React.useRef<HTMLFormElement>(null)

        useEffect(()=>{
            props.core.setFormRef(formRef)
        }, [])

        return <form
            ref={formRef}
            onSubmit={(e)=>{
                return props.core.onSubmit(e)
            }}
            {...formProps}
        />
    }

export const getRawValues = (props: {
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
