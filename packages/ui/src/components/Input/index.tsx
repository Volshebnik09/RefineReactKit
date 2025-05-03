import styled from "@emotion/styled";
import {useState} from "react";
import {
    getInputValueBoxStyles,
    StyledError,
    StyledInputHolder,
    StyledLabel,
    TFieldError
} from "../shared/index.js";

const InputTypes = {
    text: 'text',
    password: 'password',
    email: 'email',
    number: 'number',
    date: 'date',
    time: 'time',
    file: 'file',
    datetime: 'datetime',
}

type StyledInputProps = {
    isError?: boolean
}

const StyledInput = styled.input<StyledInputProps>((props)=> {
    return getInputValueBoxStyles(props.theme, props.isError)
})

type InputProps = {
    label?: string,
    value?: any
    errors?: TFieldError
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: keyof typeof InputTypes
}

const Input = (props:InputProps) => {
    const [value, setValue] = useState(props.value || '')

    const errors = props.errors
    const isError = !!errors && (errors?.length > 0)

    return <StyledInputHolder>
        <StyledLabel>
            {props.label}
        </StyledLabel>
        <StyledInput
            name={props.name}
            isError={isError}
            value={value}
            onChange={(e)=>{
                setValue(e.target.value)
                props.onChange?.(e)
            }}
            type={props.type}
        />
        {isError && (
            <StyledError>
                {Array.isArray(errors) ? errors.join(', ') : errors}
            </StyledError>
        )}
    </StyledInputHolder>
}

export {
    InputTypes,
    Input
}