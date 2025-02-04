import styled from "@emotion/styled";
import {getThemeValue} from "@/theme/Theme.js";
import {Text} from "@/components/Text/index.js";

type StyledButtonProps = {
    primary?: boolean,
    icon?: React.ReactNode,
}

const StyledButton = styled.button<StyledButtonProps>((props) => {
    const {primary, disabled, theme} = props;
    const fontSize = getThemeValue(theme, 'fontSize.sm');
    const padding = `${getThemeValue(theme, 'spacing.xs')} ${getThemeValue(theme, 'spacing.md')}`;
    const borderRadius = getThemeValue(theme, 'borderRadius.md');

    const shadows = getThemeValue(theme, 'shadows.sm');
    const backgroundColor = primary ?
        getThemeValue(theme, 'colors.button.primary') :
        getThemeValue(theme, 'colors.button.secondary');
    const border = primary ?
        'none' :
        `1px solid #a3a3a3`;

    const color = primary ?
        getThemeValue(theme, 'colors.button.textPrimary') :
        getThemeValue(theme, 'colors.button.textSecondary');
    const fontFamily = getThemeValue(theme, 'fonts-family.primary');

    return {
        backgroundColor,
        color,
        fontSize,
        padding,
        borderRadius,
        border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: '0.1s ease',
        boxShadow: shadows,
        height: `32px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily,

        '&:hover': {
            filter: disabled ? 'none' : 'brightness(0.94)',
        },

        '&:active': {
            filter: disabled ? 'none' : 'brightness(0.9)',
        },
    };
});

const Button = (props: React.ComponentProps<typeof StyledButton>) => {
    return <StyledButton {...props} >
        {props.icon &&
            <div>
                {props.icon}
            </div>
        }
        <Text.Span>
            {props.children}
        </Text.Span>
    </StyledButton>
}

export {
    Button
}