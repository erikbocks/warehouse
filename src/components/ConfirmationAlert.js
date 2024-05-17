import { React } from 'react'
import { BaseWhiteBoxOverlay } from './BaseWhiteBoxOverlay'

export function ConfirmationAlert(props) {

    let { closeFunction, confirmationFunction } = props

    function cancel() {
        closeFunction()
    }

    function confirm() {
        confirmationFunction()
        closeFunction()
    }

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col justify-center w-2/3 h-1/6 sm:max-lg:w-1/3 xl:w-1/6"}>
            <div className={"w-full h-1/2 flex items-center justify-center sm:max-lg:h-1/3 xl:h-1/3"}>
                <h1 className={"text-xl"}>Você tem certeza?</h1>
            </div>
            <div className={"w-full h-auto flex flex-row justify-evenly items-center"}>
                <button onClick={cancel} className={"bg-red-600 h-9 w-20 rounded-xl text-white sm:max-lg:w-1/3"}>
                    Não
                </button>
                <button onClick={confirm} className={"bg-green-600 h-9 w-20 rounded-xl text-white sm:max-lg:w-1/3"}>
                    Sim
                </button>
            </div >
        </BaseWhiteBoxOverlay>
    )
}