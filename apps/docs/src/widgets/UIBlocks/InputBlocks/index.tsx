import { MainPanel } from "@/widgets/UIBlocks/MainPanel";
import { Input, Select } from "@refine-react-kit/ui";

function InputBlocks() {
    return (
        <MainPanel>
            <Input
                label={'input'}
            />
            <Input
                label={'input with Error'}
                errors={"Error"}
            />
            <Input
                label="password"
                type='password'
            />
            <Input
            label="data"
                type='date'
            />
            <Input
            label="number"
                type='number'
            />
            <Select
                label={'select'}
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
                label={'select with error'}
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