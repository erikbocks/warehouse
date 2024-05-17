import { BaseWhiteBoxOverlay } from "./BaseWhiteBoxOverlay"

export function UserModal(props) {
    const { message, resetUserErrorInfo } = props

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col items-center justify-evenly w-3/5 h-1/5 sm:max-lg:w-1/3 sm:max-lg:h-1/6 xl:w-1/6 xl:h-1/6"}>
            <p className={"w-5/6 text-center"}>{message}</p>
            <button onClick={resetUserErrorInfo} className={"h-10 w-24 rounded-full bg-sky-600 text-white"}>Fechar</button>
        </BaseWhiteBoxOverlay>
    )
}