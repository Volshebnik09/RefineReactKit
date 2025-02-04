"use client";
import React from 'react';
import {Text} from "@refine-react-kit/ui";
import {MainPanel} from './MainPanel';


function TextComponents() {
    return (
        <MainPanel>
            <Text.H1>H1 Text component</Text.H1>
            <Text.H2>H2 Text component</Text.H2>
            <Text.H3>H3 Text component</Text.H3>
            <Text.H4>H4 Text component</Text.H4>
            <Text.H5>H5 Text component</Text.H5>
            <Text.H6>H6 Text component</Text.H6>
            <Text.Span>Span Text component</Text.Span>
        </MainPanel>
    );
}

export default TextComponents;