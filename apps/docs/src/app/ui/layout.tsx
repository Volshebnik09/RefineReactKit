'use client';
import {ThemeProvider, UIRegistry} from "@refine-react-kit/ui";

const Layout = (props: React.PropsWithChildren) => {
    return (
        <UIRegistry>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </UIRegistry>
    )
}

export default Layout