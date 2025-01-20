import styled from "@emotion/styled";
import {getThemeValue} from "@/theme/Theme.js";
type ButtonProps = {
    primary?: boolean
}

const Button = styled.button<ButtonProps>((props) => {
    const { primary, disabled, theme } = props;
    const fontSize = getThemeValue(theme, 'fontSize.sm');
    const padding = `${getThemeValue(theme, 'spacing.sm')} ${getThemeValue(theme, 'spacing.md')}`;
    const borderRadius = getThemeValue(theme, 'borderRadius.md');
    const borderColor = '#a3a3a3'
    const shadows = getThemeValue(theme, 'shadows.sm');
    const backgroundColor = primary ?
        getThemeValue(theme, 'colors.button.primary'):
        getThemeValue(theme, 'colors.button.secondary');

    const color = primary ?
        getThemeValue(theme, 'colors.button.textPrimary'):
        getThemeValue(theme, 'colors.button.textSecondary');
    const fontFamily = getThemeValue(theme, 'fonts-family.primary');

    return {
        backgroundColor,
        color,
        fontSize,
        padding,
        borderRadius,
        borderColor,
        border: `1px solid ${borderColor}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: '0.1s ease',
        boxShadow: shadows,
        fontFamily,

        '&:hover': {
            filter: disabled ? 'none' : 'brightness(0.94)',
        },

        '&:active': {
            filter: disabled ? 'none' : 'brightness(0.9)',
        },
    };
});


export {
    Button
}