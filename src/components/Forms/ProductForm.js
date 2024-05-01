import { React } from 'react'
import ProductFormInput from '../Inputs/ProductFormInput'
import ValueFormInput from '../Inputs/ValueFormInput'

function ProductForm(props) {
    let { productFormData, setProductFormData, saveNewProduct } = props

    const inputs = [
        {
            id: 1,
            type: "text",
            placeholder: "Nome do Produto",
            name: "product",
            maxLength: 30
        },
        {
            id: 2,
            type: "number",
            placeholder: "Quantidade do Produto",
            name: "amount",
            min: 0,
            max : 999999
        }
    ]

    return (
        <form className={"w-full h-full flex flex-col items-center sm:max-lg:h-1/5 sm:max-lg:flex-row xl:flex-row  xl:justify-evenly xl:w-4/6"} onSubmit={(e) => saveNewProduct(e)}>
            {inputs.map((input) => {
                return <ProductFormInput key={input.id} {...input} productFormData={productFormData} setProductFormData={setProductFormData} />
            })}
            <ValueFormInput productFormData={productFormData} setProductFormData={setProductFormData} />

            <div className={"w-2/4 h-24 flex justify-evenly items-center sm:max-lg:justify-start sm:max-lg:items-center sm:max-lg:w-1/4"}>
                <button className={"h-10 w-full rounded-full hover:scale-105 transition-all sm:max-lg:w-4/5 sm:max-lg:h-12 text-white bg-sky-600 hover:bg-blue-500"}>Adicionar</button>
            </div>
        </form>
    )
}

export default ProductForm