import {Flex, Panel, Text} from "@refine-react-kit/ui";
import {Baseitems} from "@/widgets/UIBlocks/FlexComponents/Baseitems";
import { MainPanel } from "../MainPanel";
import React from "react";

const FlexVerticalCenter = () => {
    return (
        <MainPanel>
            <Text.P>
                align-center column justify-center
            </Text.P>
            <Flex align-center column justify-center>
                <Baseitems/>
            </Flex>
        </MainPanel>
    )
}

const FlexHorizontalCenter = () => {
    return (
        <MainPanel>
            <Flex align-center justify-center>
                <Baseitems/>
            </Flex>
        </MainPanel>
    )
}

const FlexVerticalStart = () => {
    return (
        <MainPanel>
            <Flex align-start column>
                <Baseitems/>
            </Flex>
        </MainPanel>
    )
}

const FlexHorizontalStart = () => {
    return (
        <MainPanel>
            <Flex align-start>
                <Baseitems/>
            </Flex>
        </MainPanel>
    )
}

export {
    FlexVerticalCenter,
    FlexHorizontalCenter,
    FlexVerticalStart,
    FlexHorizontalStart
}