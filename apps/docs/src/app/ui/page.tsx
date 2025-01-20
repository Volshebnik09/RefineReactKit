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
                default
            </Button>
            <Button primary>
                primary
            </Button>
            <Button disabled>
                disabled
            </Button>
        </div>
    )
}
