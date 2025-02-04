import styled from "@emotion/styled";
import React from "react";
import {Text} from "@/components/Text/index.js";
import {Flex} from "@/components/Flex/index.js";

type TOption = {
    label: string,
    value: string
}

type TRadioProps = {
    name?: string,
    value?: string,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children?: React.ReactNode
}
const RadioInput = styled.input(props=>{
    return {
        appearance: 'none',
        width: 0,
        height: 0
    }
})

export const RadioCheckmark = styled.span<{
    checked?: boolean,
}>((props)=>{
    return {
        display: 'inline-block',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '2px solid #e0e0e0',
        cursor: 'pointer',
        position: 'relative',
        '&:after': {
            content: '""',
            display: 'block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#007BFF',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: props.checked ? 1 : 0,
        },
        ...(props.checked && {
            border: '2px solid #007BFF',
        })
    }
})

const RadioFlex = styled(Flex)((props)=>{
    return {
        cursor: 'pointer'
    }
})

const Radio = (props: TRadioProps) => {

    return (
        <RadioFlex
            align-end
            gap={5}
            onClick={()=>{
                props.onChange?.({
                    target: {
                        value: props.value,
                        checked: !props.checked
                    }
                } as React.ChangeEvent<HTMLInputElement>)
            }}
        >
            <RadioCheckmark checked={props.checked}/>
            <RadioInput
                name={props.name}
                type="radio"
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
                hidden
            />
            <Text.Span>
                {props.children}
            </Text.Span>
        </RadioFlex>
    )
}

type TRadioGroupProps = {
    name?: string,
    options?: TOption[],
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const RadioGroup = (props: TRadioGroupProps) => {
    const [value, setValue] = React.useState(props.value)

    return (
        <>
            {props.options?.map((option) => {
                return (
                    <Radio
                        name={props.name}
                        value={option.value}
                        key={option.label + option.value}
                        checked={value === option.value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            props.onChange?.(e)
                        }}
                    >
                        {option.label}
                    </Radio>
                )
            })}

        </>
    )
}

export {
    RadioGroup
}

export type {
    TOption
}