import {ThemeProvider, TTheme, useTheme} from "@refine-react-kit/ui";
import {Store, useStore} from "@tanstack/react-store";
import {undefined} from "zod";
import React from "react";

const darkTheme = {
    colors: {
        button: {
            primary: "#000",
            secondary: "#fff",
            textPrimary: "#fff",
            textSecondary: "#000"
        },
        text: {
            primary: "#fff"
        }
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