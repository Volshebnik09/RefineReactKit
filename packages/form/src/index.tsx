import React from "react";
import {createReactItem, TFieldName, TFieldsToCreate,} from "./field.js";
import {createFormCore, TFormValidators} from "./core.js";
import {createReactForm} from "./form.js";

type TUseFormProps<T extends TFieldName> = {
    fields: TFieldsToCreate<T>
    validators?: TFormValidators,
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const createForm = <T extends TFieldName>(props: TUseFormProps<T>) => {
    const core = createFormCore<T>({
        fields: props.fields,
        validators: props.validators,
        onSubmit: props.onSubmit
    })

    return {
        validateFields: core.validateFields,
        useSelector: core.useSelector,
        appendErrors: core.appendErrors,
        setFieldErrors: core.setFieldErrors,
        Item: createReactItem({
            core: core
        }),
        Form: createReactForm({
            core
        })
    }
}
