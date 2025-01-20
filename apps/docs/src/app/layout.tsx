"use client";
import "./globals.css";
import React from "react";
import {getThemeValue, UIRegistry, useTheme} from "@refine-react-kit/ui";
import {WithCustomTheme} from "@/entity/theme";


const MainBody = (props: React.PropsWithChildren) => {
    const currentTheme = useTheme()

    return (
        <body style={{
            background: getThemeValue(currentTheme, 'colors.secondaryBackground')
        }}>
        {props.children}
        <pre>
            {JSON.stringify(currentTheme)}
        </pre>
        </body>
    )
}

export default function RootLayout(props: React.PropsWithChildren) {

    return (
        <html lang="en">
        <UIRegistry>
            <WithCustomTheme>
                <MainBody>
                    {props.children}
                </MainBody>
            </WithCustomTheme>
        </UIRegistry>
        </html>
    );
}
