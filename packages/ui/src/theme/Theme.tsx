import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import {deepMerge, TRecursivePartial} from "@/utils.js";

const defaultTheme = {
    colors: {
        primary: '#0070f3',
        secondary: '#1c1c1e',
        background: '#ffffff',
        surface: '#f0f0f0',
        error: '#d32f2f',
        success: '#388e3c',
        warning: '#f57c00',
        textPrimary: '#212121',
        textSecondary: '#757575',
    },
    fontSize: {
        xs: '0.75rem', // 12px
        sm: '1rem',    // 16px
        md: '1.25rem', // 20px
        lg: '1.5rem',  // 24px
        xl: '2rem',    // 32px
        xxl: '2.5rem', // 40px
    },
    spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem',  // 8px
        md: '1rem',    // 16px
        lg: '1.5rem',  // 24px
        xl: '2rem',    // 32px
    },
    borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.5rem',  // 8px
        lg: '1rem',    // 16px
    },
    shadows: {
        sm: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        lg: '0px 6px 10px rgba(0, 0, 0, 0.24)',
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
    },
    zIndex: {
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        tooltip: 1500,
    },
};

export type TTheme = TRecursivePartial<typeof defaultTheme>

const ThemeProvider = (props:React.PropsWithChildren<{
    theme?: TTheme
}>) => {
    const mergedTheme = props.theme ? deepMerge(defaultTheme, props.theme) : defaultTheme;

    return (
        <EmotionThemeProvider theme={mergedTheme}>
            {props.children}
        </EmotionThemeProvider>
    )
}

type TPath<T> = T extends object
    ? {
        [K in keyof T]: K extends string
            ? `${K}` | `${K}.${TPath<T[K]> & string}`
            : never;
    }[keyof T]
    : never;

type TGetThemeValueType<T, P extends TPath<T>> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? TGetThemeValueType<T[K], Rest & TPath<T[K]>>
        : never
    : P extends keyof T
        ? T[P]
        : never;

const getThemeValue = <P extends NonNullable<TPath<TTheme>>>(
    theme: TTheme | undefined,
    path: P
): TGetThemeValueType<TTheme, P> => {
    const getValueByPath = (obj: any, keys: string[]): any => {
        let current = obj;
        for (const key of keys) {
            if (current[key] === undefined) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    };

    const keys = path.split('.');

    const valueFromTheme = getValueByPath(theme, keys);

    if (valueFromTheme !== undefined) {
        return valueFromTheme as TGetThemeValueType<TTheme, P>;
    }

    const valueFromDefaultTheme = getValueByPath(defaultTheme, keys);
    return valueFromDefaultTheme as TGetThemeValueType<TTheme, P>;
};

export {
    ThemeProvider,
    getThemeValue
}