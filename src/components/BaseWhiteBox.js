import React from "react";

export function BaseWhiteBox(props) {
    return (<div className={"bg-white rounded-3xl flex justify-evenly flex-col items-center border-2 drop-shadow-md p-5 " + props.styleClass}>
        {props.children}
    </div>)
}