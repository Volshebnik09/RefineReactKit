'use client';
import {Button, ThemeProvider, TTheme, UIRegistry} from "@refine-react-kit/ui";
import React from "react";

const darkTheme = {
    colors: {
        "primaryBackground": "#F0F4F8",
        "secondaryBackground": "#FFFFFF",
        "text": "#1A1A1A",
        "accent": "#007BFF",
        "accentHover": "#0056b3",
        "error": "#DC3545",
        "success": "#28A745",
        "warning": "#FFC107",
        "disabled": "#6C757D"
    }
} as TTheme

const ThemesSteps = [
    {},
    darkTheme
]

const Layout = (props: React.PropsWithChildren) => {


    const [currentTheme, setCurrentTheme] = React.useState(1);

    const toggleTheme = () => {
        setCurrentTheme((currentTheme + 1) % ThemesSteps.length);
    }

    return (
        <UIRegistry>
            <ThemeProvider theme={ThemesSteps[currentTheme]}>
                <Button onClick={toggleTheme}>
                    Switch theme
                </Button>
                {props.children}
            </ThemeProvider>
        </UIRegistry>
    )
}

export default Layout