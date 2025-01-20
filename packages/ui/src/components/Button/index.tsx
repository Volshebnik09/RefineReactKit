import styled from "@emotion/styled";
import {getThemeValue} from "@/theme/Theme.js";
type ButtonProps = {
    primary?: boolean
}

const Button = styled.button<ButtonProps>((props) => {
    const { primary, disabled, theme } = props;

    const primaryColor = getThemeValue(theme, 'colors.primaryBackground');
    const defaultColor = getThemeValue(theme, 'colors.secondaryBackground');
    const textColor = getThemeValue(theme, 'colors.text');
    const fontSize = getThemeValue(theme, 'fontSize.md');
    const padding = getThemeValue(theme, 'spacing.md');
    const borderRadius = getThemeValue(theme, 'borderRadius.md');

    return {
        backgroundColor: primary ? primaryColor : defaultColor,
        color: textColor,
        fontSize: fontSize,
        padding: padding,
        borderRadius: borderRadius,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity 0.2s ease',

        '&:hover': {
            opacity: disabled ? 0.6 : 0.9,
        },

        '&:active': {
            opacity: disabled ? 0.6 : 0.8,
        },
    };
});


export {
    Button
}