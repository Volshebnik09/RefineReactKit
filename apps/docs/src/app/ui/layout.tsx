'use client';
import {ThemeProvider, UIRegistry} from "@refine-react-kit/ui";

export default (props: React.PropsWithChildren) => {
    return (
        <UIRegistry>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </UIRegistry>
    )
}