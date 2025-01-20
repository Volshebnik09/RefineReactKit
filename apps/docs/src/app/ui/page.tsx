"use client";
import {Button, Panel, useTheme} from "@refine-react-kit/ui";
import React, {useEffect} from "react";

export default function Home() {
    const currentTheme = useTheme()

    useEffect(()=>{
        console.log(currentTheme)
    },[currentTheme])

    return (
        <div>
            <Button>
                1000
            </Button>
            <Button>
                3000
            </Button>
            <Panel>
                123123
            </Panel>
        </div>
    )
}
