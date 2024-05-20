import { React } from 'react'
import { DateFormatter } from './utils/DateFormatter'
import { BaseWhiteBoxOverlay } from './BaseWhiteBoxOverlay'
import ProductEditInput from './Inputs/ProductEditInput'
import ProductValueEditInput from './Inputs/ProductValueEditInput'

function ProductInfoModal(props) {
    const { productModalData, setProductModalData, modalFieldsDisabled, isEditingProduct, toggleEditingProduct, cancelProductEditing, resetClickedProduct, updateEditedProduct, changeIsDeleting } = props

    let inputs = [
        {
            id: 1,
            label: "Produto: ",
            name: "productName",
            type: "text",
            placeholder: "Nome do Produto",
            maxLength: 30,
            value: productModalData.productName
        },
        {
            id: 2,
            label: "Quantidade: ",
            name: "amount",
            type: "number",
            placeholder: "Quantidade",
            min: 0,
            max: 999999,
            value: productModalData.amount
        },
    ]

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col justify-center w-11/12 h-3/5 sm:max-lg:w-1/2 sm:max-lg:h-2/5 xl:w-1/5 xl:h-1/2"}>
            <div className={"w-full h-12 flex justify-center items-center"}>
                <h1 className={"text-2xl font-bold"}>Informações</h1>
            </div>
            <div className={"flex flex-col justify-center items-center"}>
                <form onSubmit={(event) => { updateEditedProduct(event) }}>
                    {inputs.map((input) => {
                        return <ProductEditInput key={input.id} {...input} productModalData={productModalData} setProductModalData={setProductModalData} disabled={modalFieldsDisabled} />
                    })}

                    <ProductValueEditInput productModalData={productModalData} setProductModalData={setProductModalData} disabled={modalFieldsDisabled} />

                    <p className={"text-center"}>Adicionado em: {DateFormatter(productModalData.createdOn)}</p>
                    <p className={"text-center"}>Editado em: {DateFormatter(productModalData.lastEdit)}</p>

                    <div className={"flex flex-row h-12 justify-evenly items-center"}>
                        {isEditingProduct &&
                            <div>
                                <button onClick={cancelProductEditing} className={"bg-zinc-500 w-24 h-10 text-white rounded-full"} >
                                    Cancelar
                                </button>
                            </div>
                        }
                        {isEditingProduct &&
                            <div>
                                <button type={"submit"} className={"bg-sky-600 w-24 h-10 text-white rounded-full"} >
                                    Salvar
                                </button>
                            </div>
                        }
                    </div>
                </form>
                <div className={"w-3/4 flex m-3 items-center justify-evenly"}>
                    {!isEditingProduct &&
                        <button onClick={toggleEditingProduct} className={'bg-zinc-500 w-24 h-10 text-white rounded-full'}>
                            Editar
                        </button>}
                    {!isEditingProduct &&
                        <button onClick={changeIsDeleting} className={'bg-red-700 w-24 h-10 text-white rounded-full'}>
                            Remover
                        </button>}
                </div>
                <div className={"w-full flex justify-center"}>
                    {!isEditingProduct &&
                        <button onClick={resetClickedProduct} className={'bg-sky-600 w-4/5 h-10 text-white rounded-full'}>
                            Fechar
                        </button>}
                </div>
            </div>
        </BaseWhiteBoxOverlay>
    )

}

export default ProductInfoModal