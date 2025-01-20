import {ThemeProvider as EmotionThemeProvider, useTheme as EmotionUseTheme} from '@emotion/react'
import {deepMerge, TPath, TRecursivePartial} from "@/utils.js";
import React from "react";
import {defaultTheme, TTheme } from './defaultTheme.js';

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

const useTheme = EmotionUseTheme
export {
    ThemeProvider,
    getThemeValue,
    useTheme
}