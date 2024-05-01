import { React, useReducer, useState } from 'react'
import { DateFormatter } from './utils/DateFormatter'
import { BaseWhiteBoxOverlay } from './BaseWhiteBoxOverlay'
import ProductEditInput from './Inputs/ProductEditInput'
import ProductValueEditInput from './Inputs/ProductValueEditInput'

function ProductInfoModal(props) {
    const { clickedProduct, cleanup, updateEditedProduct, changeIsDeleting } = props
    const [productData, setProductData] = useState({
        product: clickedProduct.product,
        amount: clickedProduct.amount,
        value: clickedProduct.value,
        addedOn: clickedProduct.addedOn,
        lastEdit: clickedProduct.lastEdit
    })

    const [state, dispatch] = useReducer(reducer, {
        disabled: true,
        editingProduct: false
    })

    function toggleEditing() {
        dispatch({
            type: "toggleEditing"
        })
    }

    function cancelEditing() {
        dispatch({
            type: "cancelEditing"
        })
    }

    function closeModal() {
        dispatch({
            type: "closeModal"
        })
    }

    async function handleSaveEditButtonClick(event) {
        event.preventDefault()

        await updateEditedProduct(productData)

        closeModal()
    }

    let inputs = [
        {
            id: 1,
            label: "Produto: ",
            name: "product",
            type: "text",
            placeholder: "Nome do Produto",
            maxLength: 30,
            property: productData.product
        },
        {
            id: 2,
            label: "Quantidade: ",
            name: "amount",
            type: "number",
            placeholder: "Quantidade",
            min: 0,
            max: 999999,
            property: productData.amount
        },
    ]

    function reducer(state, action) {
        switch (action.type) {
            case "toggleEditing":
                return { ...state, disabled: !state.disabled, editingProduct: !state.editingProduct }
            case "cancelEditing":
                setProductData({ ...clickedProduct })
                return { ...state, disabled: !state.disabled, editingProduct: !state.editingProduct }
            case "closeModal":
                cleanup()
                return { ...state }
            default:
                return state
        }
    }

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col justify-center w-11/12 h-3/5 sm:max-lg:w-1/2 sm:max-lg:h-2/5 xl:w-1/5 xl:h-1/2"}>
            <div className={"w-full h-12 flex justify-center items-center"}>
                <h1 className={"text-2xl font-bold"}>Informações</h1>
            </div>
            <div className={"flex flex-col justify-center items-center"}>
                <form onSubmit={(event) => { handleSaveEditButtonClick(event) }}>
                    {inputs.map((input) => {
                        return <ProductEditInput key={input.id} {...input} productData={productData} setProductData={setProductData} disabled={state.disabled} />
                    })}
                    <ProductValueEditInput productData={productData} setProductData={setProductData} disabled={state.disabled} />
                    <p className={"text-center"}>Adicionado em: {DateFormatter(productData.addedOn)}</p>
                    <p className={"text-center"}>Editado em: {DateFormatter(productData.lastEdit)}</p>
                    <div className={"flex flex-row h-12 justify-evenly items-center"}>
                        {state.editingProduct &&
                            <div>
                                <button onClick={cancelEditing} className={"bg-zinc-500 w-24 h-10 text-white rounded-full"} >
                                    Cancelar
                                </button>
                            </div>
                        }
                        {state.editingProduct &&
                            <div>
                                <button type={"submit"} className={"bg-sky-600 w-24 h-10 text-white rounded-full"} >
                                    Salvar
                                </button>
                            </div>
                        }
                    </div>
                </form>
                <div className={"w-3/4 flex m-3 items-center justify-evenly"}>
                    {!state.editingProduct && <button onClick={toggleEditing} className={'bg-zinc-500 w-24 h-10 text-white rounded-full'}>
                        Editar
                    </button>}
                    {!state.editingProduct && <button onClick={changeIsDeleting} className={'bg-red-700 w-24 h-10 text-white rounded-full'}>
                        Remover
                    </button>}
                </div>
                <div className={"w-full flex justify-center"}>
                    {!state.editingProduct && <button onClick={closeModal} className={'bg-sky-600 w-4/5 h-10 text-white rounded-full'}>
                        Fechar
                    </button>}
                </div>
            </div>
        </BaseWhiteBoxOverlay>
    )

}

export default ProductInfoModal