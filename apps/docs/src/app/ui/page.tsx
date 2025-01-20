"use client";
import {Button, Panel, useTheme} from "@refine-react-kit/ui";
import React, {useEffect} from "react";

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

export default function Home() {
    const currentTheme = useTheme()

    useEffect(()=>{
        console.log(currentTheme)
    },[currentTheme])

    return (
        <div>
            <Button>
                default
            </Button>
            <Button primary>
                primary
            </Button>
            <Button disabled>
                disabled
            </Button>
            <Button
                icon={<LoadingIcon/>}
            >
                with icon
            </Button>
        </div>
    )
}
