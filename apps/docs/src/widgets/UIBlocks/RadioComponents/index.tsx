import React from "react";
import {Flex, RadioGroup, Text, TOption} from "@refine-react-kit/ui";
import { MainPanel } from "../MainPanel";

const options = [
    {
        label: 'Option 1',
        value: '1'
    },
    {
        label: 'Option 2',
        value: '2'
    },
    {
        label: 'Option 3',
        value: '3'
    }

] as TOption[]

const DefaultRadio = () => {
    const [radioValue, setRadioValue] = React.useState(options[0].value)

    return (
        <MainPanel>
            <Flex column>
                <Flex column>
                    <RadioGroup options={options} value={radioValue} onChange={(e) => setRadioValue(e.target.value)}/>
                </Flex>
                <Text.Span>
                    Значение {radioValue}
                </Text.Span>
            </Flex>
        </MainPanel>
    )
}

const BlockRadio = () => {
    return (
        <MainPanel>
            <Flex column>
                <Flex column>
                    <RadioGroup options={options} block/>
                </Flex>
            </Flex>
        </MainPanel>
    )
}

export {
    DefaultRadio,
    BlockRadio
}