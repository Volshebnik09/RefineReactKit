import styled from "@emotion/styled";
import { getThemeValue } from "@/theme/Theme.js";
import { Theme } from "@emotion/react";

const getDefaultTextStyles = (props: {
    theme: Theme
}) => {
    return {
        fontSize: getThemeValue(props.theme, 'fontSize.sm'),
        color: "inherit",
        fontFamily: "inherit"
    }
}

const Span = styled.span((props)=>{
        return {
            ...getDefaultTextStyles(props),
        }
    })


const Text = {
    Span: styled.span((props)=>{
        return {
            ...getDefaultTextStyles(props),
        }
    }),
    P: styled.p((props)=>{
        return {
            ...getDefaultTextStyles(props),
        }
    }),
    H1: styled.h1((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.xxl'),
        }
    }),
    H2: styled.h2((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.xl'),
        }
    }),
    H3: styled.h3((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.lg'),
        }
    }),
    H4: styled.h4((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.md'),
        }
    }),
    H5: styled.h5((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.sm'),
        }
    }),
    H6: styled.h6((props)=>{
        return {
            ...getDefaultTextStyles(props),
            fontSize: getThemeValue(props.theme, 'fontSize.xs'),
        }
    }),
} as const

export {
    Text
}