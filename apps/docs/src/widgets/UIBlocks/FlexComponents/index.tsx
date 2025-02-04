import {Flex, Panel, RadioGroup, Text, TOption} from "@refine-react-kit/ui";
import {Baseitems} from "@/widgets/UIBlocks/FlexComponents/Baseitems";
import { MainPanel } from "../MainPanel";
import React from "react";


const alignPropsOptions = [
    'align-start',
    'align-end',
    'align-center',
    'align-stretch',
    'align-baseline',
]

const justifyPropsOptions = [
    'justify-start',
    'justify-end',
    'justify-center',
    'justify-between',
    'justify-around',
    'justify-evenly',
]

const directions = [
    'row',
    'row-reverse',
    'column',
    'column-reverse',
]

const alignOptions:TOption[] = alignPropsOptions.map(el=>{
        return {
            label: el,
            value: el
        }
    })

const justifyOptions:TOption[] = justifyPropsOptions.map(el=>{
    return {
        label: el,
        value: el
    }
})

const directionOptions:TOption[] = directions.map(el=>{
    return {
        label: el,
        value: el
    }
})

const FlexPositions = () => {
    const [alignValue, setAlignValue] = React.useState(alignOptions[0].value)
    const [justifyValue, setJustifyValue] = React.useState(justifyOptions[0].value)
    const [directionValue, setDirectionValue] = React.useState(directionOptions[0].value)

    const flexProps = {
        [alignValue]: true,
        [justifyValue]: true,
        [directionValue]: true
    }

    return (
        <MainPanel>
            <Flex column gap={20} style={{marginBottom: 20}}>
                <Flex column>
                    <Text.Span>
                        Align
                    </Text.Span>
                    <RadioGroup options={alignOptions} block value={alignValue}
                                onChange={(e) => setAlignValue(e.target.value)}/>
                </Flex>
                <Flex column>
                    <Text.Span>
                        Justify
                    </Text.Span>
                    <RadioGroup options={justifyOptions} block value={justifyValue}
                                onChange={(e) => setJustifyValue(e.target.value)}/>
                </Flex>
                <Flex column>
                    <Text.Span>
                        Direction
                    </Text.Span>
                    <RadioGroup options={directionOptions} block value={directionValue}
                                onChange={(e) => setDirectionValue(e.target.value)}/>
                </Flex>
            </Flex>
                <Flex {...flexProps}>
                    <Baseitems/>
                </Flex>
        </MainPanel>
    )
}

export {
    FlexPositions,
}