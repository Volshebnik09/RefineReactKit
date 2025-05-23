import {TRecursivePartial} from "@/utils.js";

const defaultTheme = {
    colors: {
        button: {
            primary: "#007BFF",
            secondary: "#ffffff",
            textPrimary: "#fff",
            textSecondary: "#000",
            disabled: "#e6e6e6",
        },
        text: {
            primary: "#000",
        },
        background: {
            primary: "#fff",
            selected: "#e6e6e6",
        },
        border: {
            primary: "#e0e0e0"
        }
    },
    fontsFamily: {
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
        xs: '0.3rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.35rem',
        lg: '1rem',
    },
    borderWidths: {
        sm: "1px",
    },
    shadows: {
        sm: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        lg: '0px 6px 10px rgba(0, 0, 0, 0.24)',
    },
};

type TTheme = TRecursivePartial<typeof defaultTheme>

export {
    defaultTheme
}

export type {
    TTheme
}