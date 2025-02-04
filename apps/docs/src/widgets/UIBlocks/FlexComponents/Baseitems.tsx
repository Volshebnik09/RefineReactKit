import React from "react";
import {Panel, Text} from "@refine-react-kit/ui";

export const Baseitems = () => {
    return (
        <>
            <Panel
                style={{
                    width: '120px',
                    height: '120px',
                }}
            >
                <Text.Span>
                    w: 120px
                </Text.Span>
                <br/>
                <Text.Span>
                    h: 120px
                </Text.Span>
            </Panel>
            <Panel
                style={{
                    width: '110px',
                    height: '110px',
                }}
            >
                <Text.Span>
                    w: 110px
                </Text.Span>
                <br/>
                <Text.Span>
                    h: 110px
                </Text.Span>
            </Panel>
            <Panel
                style={{
                    width: '90px',
                    height: '90px',
                }}
            >
                <Text.Span>
                    w: 90px
                </Text.Span>
                <br/>
                <Text.Span>
                    h: 90px
                </Text.Span>
            </Panel>
            <Panel
                style={{
                    width: '100px',
                }}
            >
                <Text.Span>
                    w: 100px
                </Text.Span>
            </Panel>
            <Panel
                style={{
                    height: '50px',
                }}
            >
                <Text.Span>
                    h: 50px
                </Text.Span>
            </Panel>
        </>
    )
}