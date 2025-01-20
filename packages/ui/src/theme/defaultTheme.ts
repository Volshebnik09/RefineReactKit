import {TRecursivePartial} from "@/utils.js";

const defaultTheme = {
    colors: {
        button: {
            primary: "#007BFF",
            secondary: "#ffffff",
            textPrimary: "#fff",
            textSecondary: "#000",
        }
    },
    "fonts-family": {
      primary: "sans-serif",
    },
    fontSize: {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '2.5rem',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
    },
    shadows: {
        sm: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        lg: '0px 6px 10px rgba(0, 0, 0, 0.24)',
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