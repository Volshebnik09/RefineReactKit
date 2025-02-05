import styled from "@emotion/styled";
import {getThemeValue} from "@/theme/Theme.js";
import {Text} from "@/components/Text/index.js";
import {Theme} from "@emotion/react";

type StyledButtonProps = {
    primary?: boolean,
    icon?: React.ReactNode,
}

type TProps = StyledButtonProps & {
    theme: Theme
}

const getColor = (props: TProps) => {
    if (props.primary)
        return getThemeValue(props.theme, 'colors.button.textPrimary');
    return getThemeValue(props.theme, 'colors.button.textSecondary');
}

const getBorder = (props:TProps) => {
    if (props.primary)
        return '1px solid transparent'
    return '1px solid #a3a3a3'
}

const StyledButton = styled.button<StyledButtonProps>((props) => {
    const {primary, disabled, theme} = props;
    const fontSize = getThemeValue(theme, 'fontSize.sm');
    const padding = `${getThemeValue(theme, 'spacing.xs')} ${getThemeValue(theme, 'spacing.md')}`;
    const borderRadius = getThemeValue(theme, 'borderRadius.md');

    const shadows = getThemeValue(theme, 'shadows.sm');
    const border = getBorder(props)
    const fontFamily = getThemeValue(theme, 'fonts-family.primary');

    const getBackgroundColor = () => {
        if (props.disabled)
            return getThemeValue(theme, 'colors.button.disabled');
        if (primary)
            return getThemeValue(theme, 'colors.button.primary');
        return getThemeValue(theme, 'colors.button.secondary');
    }
    const backgroundColor = getBackgroundColor();

    return {
        backgroundColor,
        fontSize,
        padding,
        borderRadius,
        border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: '0.1s ease',
        boxShadow: shadows,
        minHeight: `32px`,
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

const TextSpan = styled(Text.Span)<StyledButtonProps>((props) => {
    return {
        transition: '0.1s ease',
        '&:hover': {
            filter: 'brightness(0.94)',
        },
        '&:active': {
            filter: 'brightness(0.9)',
        },
        color: getColor(props),
    }
})

const Button = (props: React.ComponentProps<typeof StyledButton>) => {
    return <StyledButton {...props} >
        {props.icon &&
            <div>
                {props.icon}
            </div>
        }
        <TextSpan {...props}>
            {props.children}
        </TextSpan>
    </StyledButton>
}

export {
    Button
}