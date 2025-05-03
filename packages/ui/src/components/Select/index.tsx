/** @jsxImportSource @emotion/react */
import {useEffect, useState} from "react";
import {
    getInputValueBoxStyles,
    StyledError,
    StyledInputHolder,
    StyledLabel,
    TFieldError
} from "@/components/shared/index.js";
import styled from "@emotion/styled";
import {ArrowDropUp} from "@/components/svg/google/index.js";
import {getThemeValue} from "@/theme/index.js";

const StyledValueAndListHolder = styled.div<{ isError?: boolean }>((props) => {
    return {
        position: "absolute",
        userSelect: "none",
        cursor: "pointer",
        ...getInputValueBoxStyles(props.theme, props.isError),
        padding: 0,
        top: 0,
        left: 0
    }
})

type TStyledArrowDropUpHolderProps = {
    dropDownIsActive?: boolean
}

const StyledArrowDropUpHolder = styled.div((props: TStyledArrowDropUpHolderProps) => {
    return {
        transform: props.dropDownIsActive ? "rotate(0deg)" : "rotate(-180deg)",
        position: "absolute",
        right: 0,
        top: 0,
        width: "30px",
        height: "30px",
    } as const
})

type TOption<TValue> = {
    value: TValue,
    label: string,
}

type TSelectProps<TValue> = {
    value?: TValue,
    errors?: TFieldError
    label?: string
    name?: string
    options?: TOption<TValue>[]
    onChange?: (option: TValue) => void
}

const StyledList = styled.div<{
    dropDownIsActive?: boolean
}>((props) => {
    return {
        display: props.dropDownIsActive ? "block" : "none",
        maxHeight: "160px",
        overflow: "hidden",
        overflowY: "auto",
    }
})

const StyledListItem = styled.div<{selected?: boolean}>((props) => {
    const borderWidth = getThemeValue(props.theme, 'borderWidths.sm')
    const borderColor = getThemeValue(props.theme, 'colors.border.primary')
    const borderRadius = getThemeValue(props.theme, 'borderRadius.md');

    let backgroundColor = getThemeValue(props.theme, 'colors.background.primary')

    if (props.selected) backgroundColor = getThemeValue(props.theme, 'colors.background.selected')

    return {
        ...getInputValueBoxStyles(props.theme),
        backgroundColor,
        border: undefined,
        borderRadius: undefined,
        "& + &, &:nth-of-type(1)": {
            borderTop: `${borderWidth} solid ${borderColor}`,
        },
        "&:nth-of-type(-1)": {
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        },
    }
})

const StyledValueHolder = styled.div((props) => {
    return {
        ...getInputValueBoxStyles(props.theme),
        border: 'None'
    }
})

const BackgroundDiv = styled.div((props) => {
    return {
        position: "relative",
        userSelect: "none",
        cursor: "pointer",
        ...getInputValueBoxStyles(props.theme),
        border: undefined
    }
})

export const Select = <TValue = any>(props: TSelectProps<TValue>) => {
    const [value, setValue] = useState<TValue | undefined>(props.value || undefined)
    const [dropDownIsActive, setDropDownIsActive] = useState(true)

    const errors = props.errors
    const isError = !!errors && (errors?.length > 0)

    const toggleDropDown = () => {
        setDropDownIsActive(!dropDownIsActive)
    }

    const handleListItemClick = (option: TOption<TValue>) => {
        setValue(option.value)
        props.onChange?.(option.value)
    }

    useEffect(() => {
        if (props.options) {
            const uniqueValues = new Set(props.options.map(option => option.value))
            if (uniqueValues.size !== props.options.length) {
                console.warn('Select options must have unique values')
            }
        }

    }, [props.options]);

    return <StyledInputHolder>
        <StyledLabel>
            {props.label}
        </StyledLabel>
        <BackgroundDiv>
            &nbsp;
            <StyledValueAndListHolder
                onClick={() => {
                    toggleDropDown()
                }}
            >
                <StyledValueHolder>
                    {value ? String(value) : 'Select an option'}
                </StyledValueHolder>
                <StyledArrowDropUpHolder dropDownIsActive={dropDownIsActive}>
                    <ArrowDropUp/>
                </StyledArrowDropUpHolder>
                <StyledList dropDownIsActive={dropDownIsActive}>
                    {props.options?.map((option, index) => (
                        <StyledListItem
                            onClick={()=>handleListItemClick(option)} key={index}
                            selected={option.value === value}
                        >
                            {option.label}
                        </StyledListItem>
                    ))}
                </StyledList>
            </StyledValueAndListHolder>
        </BackgroundDiv>
        {isError && (
            <StyledError>
                {Array.isArray(errors) ? errors.join(', ') : errors}
            </StyledError>
        )}
    </StyledInputHolder>
}