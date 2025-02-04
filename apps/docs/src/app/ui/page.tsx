"use client";
import React from "react";
import {Flex} from "@refine-react-kit/ui";
import {ButtonComponents, FlexComponents, RadioComponents, TextComponents} from "@/widgets/UIBlocks";



export default function Home() {
    return (
        <Flex align-stretch justify-between>
            <RadioComponents.DefaultRadio/>
            <RadioComponents.BlockRadio/>
            <ButtonComponents/>
            <TextComponents/>
            <FlexComponents.FlexVerticalCenter/>
            <FlexComponents.FlexHorizontalCenter/>
            <FlexComponents.FlexVerticalStart/>
            <FlexComponents.FlexHorizontalStart/>
        </Flex>
    )
}
