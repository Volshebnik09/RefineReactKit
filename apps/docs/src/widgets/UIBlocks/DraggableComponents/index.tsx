import React from 'react';
import {MainPanel} from "@/widgets/UIBlocks/MainPanel";
import {createDragAndDropZoneGroup, Flex, Panel, Text} from "@refine-react-kit/ui";
import {createPortal} from "react-dom";

const dragAndDropGroup1 = createDragAndDropZoneGroup<{
    id: number
}>()

const dragAndDropGroup2 = createDragAndDropZoneGroup<{
    id: number
}>()

function Default() {
    const [information, setInformation] = React.useState({
        lastId: undefined as number | undefined,
        lastZone: undefined as number | undefined,
        group: undefined as number | undefined
    })

    return (
        <MainPanel>
            {createPortal(<dragAndDropGroup1.Veil/>, document.body)}
            {createPortal(<dragAndDropGroup2.Veil/>, document.body)}
            <Flex>
                {[dragAndDropGroup1, dragAndDropGroup2].map((dragAndDropGroup1, index)=> {
                    return <Panel style={{width:'fit-content'}} key={index}>
                        <Text.Span>
                            Group {index+1}
                        </Text.Span>
                        <Flex style={{marginTop: 20}}>
                            <Panel style={{width:'fit-content'}}>
                                <Flex column>
                                    <dragAndDropGroup1.Item data={{'id': index*2+1}}>
                                        <Panel style={{width: 'fit-content',background: "white"}}>
                                            <Text.Span>
                                                #{index*2+1} Drag me
                                            </Text.Span>
                                        </Panel>
                                    </dragAndDropGroup1.Item>
                                    <dragAndDropGroup1.Item data={{'id': index*2+2}}>
                                        <Panel style={{width: 'fit-content',background: "white"}}>
                                            <Text.Span>
                                                #{index*2+2} Drag me
                                            </Text.Span>
                                        </Panel>
                                    </dragAndDropGroup1.Item>
                                </Flex>
                            </Panel>
                            <Panel style={{width: 'fit-content'}}>
                                <Flex column>
                                    <dragAndDropGroup1.DropZone onDrop={(data) => {
                                        setInformation({...information, lastId: data.id, lastZone: index*2+1, group: index + 1})
                                    }}>
                                        <Panel style={{width: 'fit-content', background: "white"}}>
                                            <Text.Span>
                                                Drop here to Zone {index*2+1}
                                            </Text.Span>
                                        </Panel>
                                    </dragAndDropGroup1.DropZone>
                                    <dragAndDropGroup1.DropZone onDrop={(data) => {
                                        setInformation({...information, lastId: data.id, lastZone: index*2+2, group: index + 1})
                                    }}>
                                        <Panel style={{width: 'fit-content', background: "white"}}>
                                            <Text.Span>
                                                Drop here to Zone {index*2+2}
                                            </Text.Span>
                                        </Panel>
                                    </dragAndDropGroup1.DropZone>
                                </Flex>
                            </Panel>
                        </Flex>
                    </Panel>
                })}

            </Flex>
            <div style={{marginTop: 20}}>
                <Text.Span>
                    Last drag: {information.lastId}
                </Text.Span>
                <br/>
                <Text.Span>
                    Last zone: {information.lastZone}
                </Text.Span>
                <br/>
                <Text.Span>
                    Group: {information.group}
                </Text.Span>
            </div>
        </MainPanel>
    );
}

export {
    Default
}