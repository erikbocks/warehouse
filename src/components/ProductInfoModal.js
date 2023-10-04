import { React, useState } from 'react'
import { DateFormatter } from '../utils/DateFormatter'
import ProductEditInput from './Inputs/ProductEditInput'
import ProductValueEditInput from './Inputs/ProductValueEditInput'

function ProductInfoModal(props) {
    const { clickedProduct, cleanup, updateEditedProduct, setOpenDeleteConfirmation } = props
    const [disabled, setDisabled] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    const [productData, setProductData] = useState({
        product: clickedProduct.product,
        amount: clickedProduct.amount,
        value: clickedProduct.value,
        addedOn: clickedProduct.addedOn,
        lastEdit: clickedProduct.lastEdit
    })

    function handleCancelEditButtonClick() {
        setDisabled(true)
        setIsEditing(false)
        setProductData({ ...clickedProduct })
    }

    async function handleSaveEditButtonClick(event) {
        event.preventDefault()

        await updateEditedProduct(productData)

        handleCloseButtonClick()
    }

    function handleEditButtonClick() {
        setDisabled(false)
        setIsEditing(true)
    }

    async function handleRemoveButtonClick() {
        setOpenDeleteConfirmation(true)
    }

    function handleCloseButtonClick() {
        cleanup()
        setDisabled(true)
    }

    let inputs = [
        {
            id: 1,
            label: "Produto: ",
            name: "product",
            type: "text",
            placeholder: "Nome do Produto",
            property: productData.product
        },
        {
            id: 2,
            label: "Quantidade: ",
            name: "amount",
            type: "number",
            placeholder: "Quantidade",
            property: productData.amount
        },
    ]

    return (
        <div className={'fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'}>
            <div className={'bg-white rounded-2xl w-11/12 h-4/6 flex flex-col justify-center md:max-lg:w-1/2 md:max-lg:h-2/5 xl:w-1/6 xl:h-2/4'}>
                <div className={"w-full h-12 flex justify-center items-center"}>
                    <h1 className={"text-2xl font-bold"}>Informações</h1>
                </div>
                <form onSubmit={(event) => { handleSaveEditButtonClick(event) }}>
                    {inputs.map((input) => {
                        return <ProductEditInput key={input.id} {...input} productData={productData} setProductData={setProductData} disabled={disabled} />
                    })}
                    <ProductValueEditInput productData={productData} setProductData={setProductData} disabled={disabled} />
                    <p className={"text-center"}>Adicionado em: {DateFormatter(productData.addedOn)}</p>
                    <p className={"text-center"}>Editado em: {DateFormatter(productData.lastEdit)}</p>
                    <div className={"flex flex-row h-12 justify-evenly items-center"}>
                        {isEditing &&
                            <div>
                                <button onClick={handleCancelEditButtonClick} className={"bg-zinc-500 w-24 h-10 text-white rounded-full"} >
                                    Cancelar
                                </button>
                            </div>
                        }
                        {isEditing &&
                            <div>
                                <button type={"submit"} className={"bg-sky-600 w-24 h-10 text-white rounded-full"} >
                                    Salvar
                                </button>
                            </div>
                        }
                    </div>
                </form>
                <div className={"flex m-3 items-center justify-evenly"}>
                    {!isEditing && <button onClick={handleEditButtonClick} className={'bg-zinc-500 w-24 h-10 text-white rounded-full'}>
                        Editar
                    </button>}
                    {!isEditing && <button onClick={handleRemoveButtonClick} className={'bg-red-700 w-24 h-10 text-white rounded-full'}>
                        Remover
                    </button>}
                </div>
                <div className={"w-full flex justify-center"}>
                    {!isEditing && <button onClick={handleCloseButtonClick} className={'bg-sky-600 w-4/5 h-10 text-white rounded-full'}>
                        Fechar
                    </button>}
                </div>

            </div>
        </div>
    )

}

export default ProductInfoModal