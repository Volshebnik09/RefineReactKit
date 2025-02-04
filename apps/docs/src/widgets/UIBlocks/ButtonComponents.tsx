"use client";
import React from 'react';
import {Panel, Button} from "@refine-react-kit/ui";

const LoadingIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             style={{
                 animation: 'spin 1s linear infinite',
                 height: '12px',
             }}
        >
            <path
                style={{
                    strokeDasharray: '90, 150',
                    strokeDashoffset: '-124'
                }}
                fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

function ButtonComponents() {
    return (
        <Panel>
            <Button>
                default
            </Button>
            <Button primary>
                primary
            </Button>
            <Button disabled>
                disabled
            </Button>
            <Button  icon={<LoadingIcon/>}>
                with icon
            </Button>
        </Panel>
    );
}

export default ButtonComponents;