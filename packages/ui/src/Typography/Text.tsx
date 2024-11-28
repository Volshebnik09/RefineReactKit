import React from 'react';

export type TextComponentProps = React.HtmlHTMLAttributes<HTMLParagraphElement>

const TextTypeToComponent = {
    h1: (props: TextComponentProps) => <h1 {...props}/>,
    h2: (props: TextComponentProps) => <h2 {...props}/>,
    h3: (props: TextComponentProps) => <h3 {...props}/>,
    h4: (props: TextComponentProps) => <h4 {...props}/>,
    h5: (props: TextComponentProps) => <h5 {...props}/>,
    h6: (props: TextComponentProps) => <h6 {...props}/>,
    p: (props: TextComponentProps) => <p {...props}/>,
    span: (props: TextComponentProps) => <span {...props}/>,
} as const

export type TTextType = keyof typeof TextTypeToComponent

export type TTextProps = {
    type: TTextType,
} & TextComponentProps

function Text(props: TTextProps) {
    return TextTypeToComponent[props.type](props)
}

export default Text;