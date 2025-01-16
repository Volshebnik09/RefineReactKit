'use client';
import {UIRegistry} from "@refine-react-kit/ui";

export default (props: React.PropsWithChildren) => {
    return (
        <UIRegistry>
            {props.children}
        </UIRegistry>
    )
}