import React from "react";
import {ThemeProvider, useTheme} from "@refine-react-kit/ui";
import {useCustomTheme} from "@/entity/theme/model";

export const WithCustomTheme = (props: React.PropsWithChildren) => {
    const theme = useCustomTheme()
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}