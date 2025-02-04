import {Panel} from "@refine-react-kit/ui";

const MainPanel = (props:React.PropsWithChildren) => {
    return (
        <Panel>
            {props.children}
        </Panel>
    )
}

export {
    MainPanel
}