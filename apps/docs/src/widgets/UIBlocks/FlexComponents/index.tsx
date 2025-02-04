import {Flex, Panel} from "@refine-react-kit/ui";
import {Baseitems} from "@/widgets/UIBlocks/FlexComponents/Baseitems";
import { MainPanel } from "../MainPanel";

const FlexVerticalCenter = () => {
    return (
        <MainPanel>
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