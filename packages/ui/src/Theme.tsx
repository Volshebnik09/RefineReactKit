import React from "react";
import {createPortal} from "react-dom";
import hash from '@emotion/hash'

type TTheme = {
    font: {
        size: {
            h1: string,
            h2: string,
            h3: string,
            h4: string,
            h5: string,
            h6: string,
        },
        families: {
            default: string
        }
    },
    colors: {
        primary: string,
        secondary: string,
        success: string,
        info: string,
        warning: string,
        danger: string,
        muted: string,
        white: string,
        black: string
    }
};

const defaultTheme: TTheme = {
    font: {
        size: {
            h1: "2.5rem",
            h2: "2rem",
            h3: "1.75rem",
            h4: "1.5rem",
            h5: "1.25rem",
            h6: "1rem",
        },
        families: {
            default: "Arial, sans-serif"
        }
    },
    colors: {
        "primary": "#007BFF",
        "secondary": "#6C757D",
        "success": "#28A745",
        "info": "#17A2B8",
        "warning": "#FFC107",
        "danger": "#DC3545",
        "muted": "#6C757D",
        "white": "#FFFFFF",
        "black": "#000000",
    }
}

const ThemeContext = React.createContext(defaultTheme);

const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ThemeContext.Provider;

type TThemeToCss = (theme: TTheme) => Record<string, React.CSSProperties>

// Список CSS-свойств, которые не требуют единицы измерения
const unitlessProperties = new Set([
    'lineHeight',
    'zIndex',
    'opacity',
    'flex',
    'order',
]);

function isUnitlessProperty(property: string): boolean {
    return unitlessProperties.has(property);
}

function cssPropertiesToString(styles: React.CSSProperties): string {
    return Object.entries(styles)
        .map(([key, value]) => {
            // Преобразуем camelCase в kebab-case
            const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

            // Если значение — число, добавляем 'px', кроме исключений
            const cssValue = typeof value === 'number' && !isUnitlessProperty(key)
                ? `${value}px`
                : value;

            return `${cssKey}: ${cssValue};`;
        })
        .join(' ');
}

const activeStyles = new Map<string, string>();



const useStylesRegister = (themeToCss: TThemeToCss) => {
    const themeContext = React.useContext(ThemeContext);
    const id = React.useMemo(()=>{
        return `btn`
    }, [])


    const styles = themeToCss(themeContext);
    let stylesString = ""
    Object.keys(styles).forEach((key) => {
        stylesString += `.${id} {
            ${cssPropertiesToString(styles[key]!)}
        }`
    })

    const stylesHash = React.useMemo(()=>{
        return hash(stylesString)
    },[stylesString])

    return (node: React.ReactNode) => {
        let styleNode: React.ReactElement;
        console.log(activeStyles);

        if (activeStyles.has(stylesHash)) {
            styleNode = <></>
        } else {
            activeStyles.set(stylesHash, stylesString)
            styleNode = <style
                    dangerouslySetInnerHTML={{__html: stylesString}}
                />
        }

        return <>
            {styleNode}
            {node}
        </>
    }
}

export {
    useStylesRegister,
    defaultTheme,
    ThemeContext,
    useTheme,
    ThemeProvider
}

export type {
    TTheme
}
