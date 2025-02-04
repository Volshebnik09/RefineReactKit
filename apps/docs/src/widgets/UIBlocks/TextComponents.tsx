"use client";
import React, {useEffect} from 'react';
import {Panel, Text} from "@refine-react-kit/ui";
import reactElementToJSXString from 'react-element-to-jsx-string';

function TextComponents() {
    const codeBlockRef = React.useRef<HTMLDivElement>(null);
    const content = (
        <>
            <Text.H1>H1 Text component</Text.H1>
            <Text.H2>H2 Text component</Text.H2>
            <Text.H3>H3 Text component</Text.H3>
            <Text.H4>H4 Text component</Text.H4>
            <Text.H5>H5 Text component</Text.H5>
            <Text.H6>H6 Text component</Text.H6>
            <Text.Span>Span Text component</Text.Span>
            <Text.P>Paragraph Text component</Text.P>
        </>
    )
    useEffect(()=>{
        const codeString = reactElementToJSXString(content)
        if (!codeBlockRef.current) return
        codeBlockRef.current.textContent = codeString
    }, [])

    return (
        <Panel>
            {content}
            <pre>
                <code ref={codeBlockRef}/>
            </pre>
        </Panel>
    );
}

export default TextComponents;