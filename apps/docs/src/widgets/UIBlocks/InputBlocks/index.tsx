import React from 'react';
import {MainPanel} from "@/widgets/UIBlocks/MainPanel";
import {Input, InputTypes} from "@refine-react-kit/ui";

function InputBlocks() {
    return (
        <MainPanel>
            <Input
                label={'Label'}
            />
        </MainPanel>
    );
}

export default InputBlocks;