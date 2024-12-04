import React, {JSX} from 'react';
import {TTheme, useTheme} from "@/Theme.js";

export type TextComponentProps = React.HtmlHTMLAttributes<HTMLParagraphElement>

const createText = (tag: keyof JSX.IntrinsicElements, keys: {
    size: keyof TTheme["font"]["size"],
    fontFamily?: keyof TTheme["font"]["families"]
})=> {


    const Text = (props: TextComponentProps) => {
        const theme = useTheme();
        const fontFamily = keys.fontFamily ? theme.font.families[keys.fontFamily] : theme.font.families.default
        const size = theme.font.size[keys.size]

        return React.createElement(tag, {
            ...props,
        })
    }

    return Text

}


const Title = {
    H1: createText('h1', {
        size: "h1",
        fontFamily: "default"
    }),
    H2: (props: TextComponentProps) => <h2 {...props}/>,
    H3: (props: TextComponentProps) => <h3 {...props}/>,
    H4: (props: TextComponentProps) => <h4 {...props}/>,
    H5: (props: TextComponentProps) => <h5 {...props}/>,
    H6: (props: TextComponentProps) => <h6 {...props}/>,
}

const Text = {
    P: (props: TextComponentProps) => <p {...props}/>,
    Span: (props: TextComponentProps) => <span {...props}/>,
}

const Typography = {
    Title,
    Text
}

export default Typography

export {
    Typography,
    Title,
    Text
}
