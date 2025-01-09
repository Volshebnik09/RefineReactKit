import {Store, useStore} from "@tanstack/react-store";
import {createNewFields, TFieldMeta, TFieldName, TFieldsToCreate} from "./field.js";
import {z} from "zod";
import React from "react";
import {getRawValues, TOnSubmit} from "./form.js";
import deepEqual from "./helpers/deepEqual.js";

export type TFormValidators = {
    onChange?: z.ZodObject<any> | z.ZodEffects<any>
    onMount?: z.ZodObject<any> | z.ZodEffects<any>
    beforeSubmit?: z.ZodObject<any> | z.ZodEffects<any>
}

export const createFormCore = <T extends TFieldName>(props: {
    fields: TFieldsToCreate<T>
    validators?: TFormValidators,
    onSubmit?: TOnSubmit
}) => {
    const store = new Store({
        fields: createNewFields({fields: props.fields}),
        isLoading: true,
        validators: props.validators,
        formRef: null as React.RefObject<HTMLFormElement> | null,
        haveErrors: false as boolean
    })

     function useSelector <TResult>(selector: (state: typeof store.state) => TResult): TResult {
        return useStore(store, selector);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        store.setState((state) => {
            return {
                ...state,
                isLoading: true
            }
        })

        if (props.validators?.beforeSubmit) {
            validateFields({
                validationFunction: props.validators.beforeSubmit.safeParse,
                forceTouch: true,
                store
            })

            if (store.state.haveErrors) {
                store.setState((state) => {
                    return {
                        ...state,
                        isLoading: false
                    }
                })
                return
            }
        }

        if (props.onSubmit) {
            await props.onSubmit(e)
        }

        store.setState((state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }

    const setCurrentStoreFieldErrors = (props: {
        name: T,
        forceTouch?: boolean,
        errors: string[]
    }) => setFieldErrors({
        ...props,
        store
    })

    const updateCurrentStoreField = (props: {
        fieldMeta: TFieldMeta<T>
    }) => updateField({
        ...props,
        store
    })

    const validateCurrentStoreFields = (props: {
        validationFunction: z.ZodObject<any>['safeParse'],
        forceTouch?: boolean
    }) => {
        return validateFields({
            forceTouch: props.forceTouch,
            validationFunction: props.validationFunction,
            store: store
        })
    }

    const setFormRef = (formRef: React.RefObject<HTMLFormElement>) => {
        store.setState((state) => {
            return {
                ...state,
                formRef
            }
        })
    }

    const appendErrorsToCurrentStoreField = (props: {
        name: T,
        forceTouch?: boolean,
        errors: string[]
    }) => appendErrors({
        ...props,
        store
    })

    return {
        useSelector,
        store,
        updateIsLoading: (isLoading: boolean) => store.setState((state) => {
            return {
                ...state,
                isLoading
            }
        }),
        onSubmit,
        setFormRef,
        setFieldErrors: setCurrentStoreFieldErrors,
        updateField: updateCurrentStoreField,
        appendErrors:appendErrorsToCurrentStoreField,
        validateFields: validateCurrentStoreFields,
    }
}

export type TFormStore<T extends TFieldName> = ReturnType<typeof createFormCore<T>>['store']

export type TFormCore<T extends TFieldName> = ReturnType<typeof createFormCore<T>>

type TSetFieldErrorsProps<T extends TFieldName> = {
    store: TFormStore<T>,
    name: T,
    forceTouch?: boolean,
    errors: string[]
}

const setFieldErrors = <T extends TFieldName>(props: TSetFieldErrorsProps<T>) => {
    updateField({
        store: props.store,
        fieldMeta: {
            ...props.store.state.fields[props.name],
            errors: props.errors,
            touched: props.forceTouch ? true : props.store.state.fields[props.name].touched
        }
    })
}

type TValidateFieldsProps<T extends TFieldName> = {
    store: TFormStore<T>,
    validationFunction: z.ZodObject<any>['safeParse'],
    forceTouch?: boolean,
}

const validateFields = <T extends TFieldName>(props: TValidateFieldsProps<T>) => {
    const newFieldsErrors = {} as Record<T, TFieldMeta<T>>
    const formRef = props.store.state.formRef

    Object.keys(props.store.state.fields).forEach((key) => {
        newFieldsErrors[key as T] = {
            ...props.store.state.fields[key as T],
            errors: []
        }
    })

    if (!formRef?.current) {
        console.error(
            "formRef.current is null!",
            "You need to use form.Form component to validate fields"
        )
        return
    }

    const rawValues = getRawValues({
        formRef,
        fields: props.store.state.fields
    })

    Object.keys(newFieldsErrors).forEach((key) => {
        newFieldsErrors[key as T].errors = []
    })

    const res = props.validationFunction(rawValues)
    if (res?.error) {
        res.error.issues.map((i) => {
            const key = i.path[0] as T
            if (newFieldsErrors[key].errors.indexOf(i.message) !== -1) return
            newFieldsErrors[key].errors.push(i.message)
        })
    }

    Object.keys(newFieldsErrors).forEach((key) => {
        setFieldErrors({
            store: props.store,
            name: key as T,
            errors: newFieldsErrors[key as T].errors,
            forceTouch: props.forceTouch
        })
    })

}

type TUpdateFieldProps<T extends TFieldName> = {
    store: TFormStore<T>,
    fieldMeta: TFieldMeta<T>
}

const updateField = <T extends TFieldName>(props: TUpdateFieldProps<T>) => {

    const oldFieldMeta = props.store.state.fields[props.fieldMeta.name]
    const newFieldMeta = props.fieldMeta


    if (!deepEqual(oldFieldMeta, newFieldMeta)) {
        props.store.setState((state) => {
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [props.fieldMeta.name]: newFieldMeta
                }
            }
        })
    }

    props.store.setState((state)=>{
        return {
            ...state,
            haveErrors: formHaveErrors({
                store: props.store
            })
        }
    })
}


type TAppendErrorsProps<T extends TFieldName> = {
    name: T,
    errors: string[],
    store: TFormStore<T>,
    forceTouch?: boolean
}

const appendErrors = <T extends TFieldName>(props: TAppendErrorsProps<T>) => {
    updateField({
        store: props.store,
        fieldMeta: {
            ...props.store.state.fields[props.name],
            errors: [...props.store.state.fields[props.name].errors, ...props.errors],
            touched: props.forceTouch ? true : props.store.state.fields[props.name].touched
        }
    })
}

type TFormHaveErrors <T extends TFieldName> = {
    store: TFormStore<T>
}

const formHaveErrors = <T extends TFieldName>(props: TFormHaveErrors<T>) => {
    return Object.keys(props.store.state.fields).some((key) => {
        return props.store.state.fields[key as T].errors.length > 0
    })
}
