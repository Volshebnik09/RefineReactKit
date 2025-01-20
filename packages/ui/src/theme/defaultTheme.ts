import {TRecursivePartial} from "@/utils.js";

const defaultTheme = {
    colors: {
        "primaryBackground": "#FFFFFF",
        "secondaryBackground": "#F5F5F5",
        "text": "#333333",
        "accent": "#6200EE",
        "accentHover": "#3700B3",
        "error": "#B00020",
        "success": "#00C853",
        "warning": "#FFAB00",
        "disabled": "#9E9E9E"
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

type TTheme = TRecursivePartial<typeof defaultTheme>

export {
    defaultTheme
}

export type {
    TTheme
}