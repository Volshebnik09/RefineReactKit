import styled from "@emotion/styled";
import {getThemeValue} from "@/theme/Theme.js";

const Panel = styled.div((props)=>{
    const padding = getThemeValue(props.theme, 'spacing.md');
    return {
        width: '100%',
        borderRadius: '8px',
        padding: padding,
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box'
    }
})

export {
    Panel
}