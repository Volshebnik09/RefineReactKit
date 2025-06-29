import { ThemeProvider as EmotionThemeProvider, useTheme as EmotionUseTheme } from '@emotion/react';
import { deepMerge, TPath } from "@/utils.js";
import { defaultTheme, TTheme } from './defaultTheme.js';
import { PropsWithChildren } from 'react';

type TGetThemeValueType<T, P extends TPath<T>> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? TGetThemeValueType<T[K], Rest & TPath<T[K]>>
        : any
    : P extends keyof T
        ? T[P]
        : any;

const getThemeValue = <P extends NonNullable<TPath<TTheme>>>(
    theme: TTheme | undefined,
    path: P
)=> {
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

export const useThemeValue = <P extends NonNullable<TPath<TTheme>>>(path: P) => {
    const theme = EmotionUseTheme();

    return getThemeValue(theme, path);
}

const ThemeProvider = (props:PropsWithChildren<{
    theme?: TTheme
}>) => {
    const mergedTheme = props.theme ? deepMerge(defaultTheme, props.theme) : defaultTheme;

    return (
        <EmotionThemeProvider theme={mergedTheme}>
            {props.children}
        </EmotionThemeProvider>
    )
}

const useTheme = EmotionUseTheme
export {
    ThemeProvider,
    getThemeValue,
    useTheme
}