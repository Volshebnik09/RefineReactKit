import {ThemeProvider, TTheme, useTheme} from "@refine-react-kit/ui";
import {Store, useStore} from "@tanstack/react-store";
import {undefined} from "zod";
import React from "react";

const darkTheme = {
    colors: {
        // "primaryBackground": "#121212",
        // "secondaryBackground": "#1E1E1E",
        // "text": "#E0E0E0",
        // "accent": "#BB86FC",
        // "accentHover": "#9A67EA",
        // "error": "#CF6679",
        // "success": "#03DAC6",
        // "warning": "#FFD600",
        // "disabled": "#616161"
    }
} as TTheme

export const ThemesEnum = {
    Default: "Default",
    DarkTheme: "DarkTheme"
} as const

type TThemes = keyof typeof ThemesEnum

const Themes = {
    [ThemesEnum.Default]: undefined,
    [ThemesEnum.DarkTheme]: darkTheme
} as Record<TThemes, TTheme | undefined>

const customThemeStore = new Store<TTheme | undefined>(Themes.Default)

export const setTheme = (theme: TThemes) => {
    const themeValue = Themes[theme]
    customThemeStore.setState(() => themeValue)
}

export const useCustomTheme = () => useStore(customThemeStore)