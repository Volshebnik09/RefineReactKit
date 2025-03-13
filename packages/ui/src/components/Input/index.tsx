import styled from "@emotion/styled";
import {css, keyframes} from "@emotion/react";
import {useState} from "react";
import {Text} from "@/components/Text/index.js";
import {getThemeValue} from "@/theme/index.js";

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

const shakeAnimation = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
`;


const StyledInput = styled.input<StyledInputProps>((props)=> {
    const errorStyles = props.isError && {
        border: '1px solid red',
        animation: `${shakeAnimation} 0.3s ease-in-out`
    }

    return {
        boxSizing: 'border-box',
        width: '100%',
        padding: '8px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: '16px',
        outline: "none",
        transition: "1s",
        ...errorStyles
    }
})

type InputProps = {
    label?: string,
    value?: any
    errors?: string | string[] | false
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: keyof typeof InputTypes
}

const StyledLabel = styled(Text.Span)(props=>{
    return {
        display:'block',
        marginBottom: getThemeValue(props.theme, 'spacing.sm'),
    }
})

const StyledError = styled(Text.Span)((props)=>{
    return {
        display: 'block',
        marginTop: getThemeValue(props.theme, 'spacing.sm'),
        color: 'red'
    }
})

const StyledInputHolder = styled.div((props)=>{
    return {
        marginTop: getThemeValue(props.theme, 'spacing.sm'),
    }
})

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