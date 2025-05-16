import React from 'react';
import {MainPanel} from "@/widgets/UIBlocks/MainPanel";
import {Input, Select} from "@refine-react-kit/ui";

function InputBlocks() {
    return (
        <MainPanel>
            <Input
                label={'Default'}
            />
            <Input
                label={'With Error'}
                errors={"Error"}
            />
            <Select
                label={'With Label'}
                options={[
                    {
                        value: "value1",
                        label: "value1"
                    },
                    {
                        value: "value2",
                        label: "value2"
                    },
                    {
                        value: "value3",
                        label: "value3"
                    },
                    {
                        value: "value4",
                        label: "value4"
                    },
                ]}
            />
            <Select
                label={'With Error'}
                errors={"Error"}
                options={[
                    {
                        value: "value1",
                        label: "value1"
                    },
                    {
                        value: "value2",
                        label: "value2"
                    },
                    {
                        value: "value3",
                        label: "value3"
                    },
                    {
                        value: "value4",
                        label: "value4"
                    },
                ]}
            />
        </MainPanel>
    );
}

export default InputBlocks;