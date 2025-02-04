import styled from "@emotion/styled";
import {ValidateSingleFlag} from "@/utils.js";

const alignOptions = {
    'align-start': 'flex-start',
    'align-center': 'center',
    'align-end': 'flex-end',
    'align-stretch': 'stretch',
    'align-baseline': 'baseline'
} as const

const justifyOptions = {
    'justify-start': 'flex-start',
    'justify-center': 'center',
    'justify-end': 'flex-end',
    'justify-between': 'space-between',
    'justify-around': 'space-around',
    'justify-evenly': 'space-evenly'
} as const

const directionOptions = {
    'row': 'row',
    'row-reverse': 'row-reverse',
    'column': 'column',
    'column-reverse': 'column-reverse'
} as const

type AlignFlags = keyof typeof alignOptions;
type JustifyFlags = keyof typeof justifyOptions;
type DirectionFlags = keyof typeof directionOptions


type FlexProps = {
    "no-wrap"?: boolean
    gap?: number
} & {
    [key in AlignFlags]?: boolean
} & {
    [key in JustifyFlags]?: boolean
} & {
    [key in DirectionFlags]?: boolean
}

const Flex = styled.div<FlexProps>(props=> {
    const alignFlag = (Object.keys(alignOptions).find(key => Object.hasOwn(props, key)) || 'align-start') as AlignFlags
    const justifyFlag = (Object.keys(justifyOptions).find(key => Object.hasOwn(props, key)) || 'justify-start') as JustifyFlags
    const directionFlag = (Object.keys(directionOptions).find(key => Object.hasOwn(props, key)) || 'row') as DirectionFlags

    const alignItems = alignOptions[alignFlag]
    const justifyContent = justifyOptions[justifyFlag]
    const flexDirection = directionOptions[directionFlag]

    const gap = props.gap || 10
    const flexWrap = props['no-wrap'] ? 'nowrap' : 'wrap'
    return {
        display: 'flex',
        alignItems,
        justifyContent,
        flexWrap,
        gap,
        flexDirection
    }
})

export {
    Flex
}

export type {
    FlexProps
}