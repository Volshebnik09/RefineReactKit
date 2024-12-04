import React from "react";
import {ThemeContext, useStylesRegister} from "@/Theme.js";
import Typography from "@/Typography/index.js";


type TProps = {
    disabled?: boolean
}


const Button: React.FC<React.PropsWithChildren<TProps>> = (props) => {
    const theme = React.useContext(ThemeContext);

    const color = theme.colors.white
    const backgroundColor = theme.colors.primary

    const wrap = useStylesRegister(theme=> ({
        ".btn": {
            border: "none",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            minWidth: 100,
            color: theme.colors.white,
            backgroundColor: theme.colors.primary,
        }
    }))

    return wrap(
        <button
            {...props}
            className={'btn'}
        >
            <Typography.Text.Span>
                {props.children}
            </Typography.Text.Span>
        </button>
    )

}


export {
    Button
}