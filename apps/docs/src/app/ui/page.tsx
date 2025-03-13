"use client";
import React from "react";
import {Flex} from "@refine-react-kit/ui";
import {
    ButtonComponents,
    DraggableComponents,
    FlexComponents,
    RadioComponents,
    TextComponents
} from "@/widgets/UIBlocks";
import InputBlocks from "@/widgets/UIBlocks/InputBlocks";



export default function Home() {
    return (
        <Flex align-stretch justify-between>
            <InputBlocks/>
            <DraggableComponents.Default/>
            <RadioComponents.DefaultRadio/>
            <RadioComponents.BlockRadio/>
            <ButtonComponents/>
            <TextComponents/>
            <FlexComponents.FlexPositions/>
        </Flex>
    )
}
