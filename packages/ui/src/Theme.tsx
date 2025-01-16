import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

const defaultTheme = {
    fontSize: {
        main: '26px'
    }
}

const ThemeProvider = (props:React.PropsWithChildren) => {
    return (
        <EmotionThemeProvider theme={defaultTheme}>
            {props.children}
        </EmotionThemeProvider>
    )
}

export {
    ThemeProvider
}