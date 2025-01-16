import styled from "@emotion/styled";
type ButtonProps = {
    primary?: boolean
}

const Button = styled.button<ButtonProps>(props=>({
    color: 'red',
    backgroundColor: props.primary ? 'yellow' : 'blue',
    fontSize: props.theme.fontSize?.md || '18px'
}))

export {
    Button
}