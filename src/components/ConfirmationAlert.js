import { React } from 'react'

export function ConfirmationAlert(props) {

    let { setOpenDeleteConfirmation, eraseClickedProduct } = props

    function handleCancelButtonClick() {
        setOpenDeleteConfirmation(false)
    }

    function handleEraseButtonClick() {
        eraseClickedProduct()
        setOpenDeleteConfirmation(false)
    }

    return (
        <div className={"fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"}>
            <div className={"bg-white rounded-2xl w-2/3 h-1/6 "}>
                <div className={"w-full h-2/4 flex items-center justify-center"}>
                    <h1 className={"text-xl"}>Você tem certeza?</h1>
                </div>
                <div className={"h-2/4 flex flex-row justify-evenly items-center"}>
                    <button onClick={handleCancelButtonClick} className={"bg-red-600 h-9 w-20 rounded-xl text-white"}>
                        Não
                    </button>
                    <button onClick={handleEraseButtonClick} className={"bg-green-600 h-9 w-20 rounded-xl text-white"}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}