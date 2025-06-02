import styled from "@emotion/styled";
import { getThemeValue } from "@/theme/index.js";
import { Text } from "@/components/Text/index.js";
import { Theme } from "@emotion/react";
import { shakeAnimation } from "@/components/shared/animations.js";
export * from "./animations.js"

export const StyledInputHolder = styled.div((props)=>{
    return {
        marginTop: getThemeValue(props.theme, 'spacing.sm'),
        fontFamily: "inherit"
    }
})

export const StyledLabel = styled(Text.Span)(props=>{
    return {
        display:'block',
        marginBottom: getThemeValue(props.theme, 'spacing.sm'),
    }
})

export const StyledError = styled(Text.Span)((props)=>{
    return {
        display: 'block',
        marginTop: getThemeValue(props.theme, 'spacing.sm'),
        color: 'red'
    }
})

export const getInputValueBoxStyles = (theme: Theme, isError?:boolean)=> {
    const padding = `${getThemeValue(theme, 'spacing.xs')} ${getThemeValue(theme, 'spacing.md')}`;
    const borderRadius = getThemeValue(theme, 'borderRadius.md');

    const borderColor = getThemeValue(theme, 'colors.border.primary')
    const borderWidth = getThemeValue(theme, 'borderWidths.sm')

    const errorStyles = isError && {
        border: `${borderWidth} solid red`,
        animation: `${shakeAnimation} 0.3s ease-in-out`
    }

    return {
        transition: "1s",
        outline: "none",
        boxSizing:'border-box',
        fontSize: '16px',
        width: '100%',
        fontFamily:"inherit",
        padding,
        borderRadius,
        border: `${borderWidth} solid ${borderColor}`,
        ...errorStyles
    } as const
}

export type TFieldError = string | string[]