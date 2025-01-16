import React from "react";

const Button = (props: React.PropsWithChildren) => {
    return <button className={`button`}>
        {props.children}
    </button>
}

export {
    Button
}