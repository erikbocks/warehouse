import React from 'react'

export function BaseWhiteBoxOverlay(props) {
    return (
        <div className={'fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'}>
            <div className={"bg-white rounded-3xl items-center border-2 drop-shadow-md " + props.styleClass}>
                {props.children}
            </div>
        </div>
    )
}