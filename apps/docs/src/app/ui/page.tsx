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



export default function Home() {
    return (
        <Flex align-stretch justify-between>
            <DraggableComponents.Default/>
            <RadioComponents.DefaultRadio/>
            <RadioComponents.BlockRadio/>
            <ButtonComponents/>
            <TextComponents/>
            <FlexComponents.FlexPositions/>
        </Flex>
    )
}
