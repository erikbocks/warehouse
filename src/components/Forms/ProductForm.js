import { React } from 'react'
import { saveProduct } from '../../api/axios'
import ProductFormInput from '../Inputs/ProductFormInput'
import ValueFormInput from '../Inputs/ValueFormInput'

function ProductForm(props) {

    let { productFormData, setProductFormData, userId, setForceUpdate } = props

    async function handleSubmit(e) {
        e.preventDefault()

        const newProduct = {
            product: productFormData.product,
            amount: productFormData.amount,
            value: productFormData.value,
            owner: { id: userId }
        }

        await saveProduct(newProduct).then(setForceUpdate(true))
    }

    const inputs = [
        {
            id: 1,
            type: "text",
            placeholder: "Nome do Produto",
            name: "product",
        },
        {
            id: 2,
            type: "number",
            placeholder: "Quantidade do Produto",
            name: "amount",
        }
    ]

    return (
        <form className={"h-full w-full flex flex-col items-center md:max-lg:h-1/5 md:max-lg:flex-row xl:h-1/5 xl:flex-row xl:w-4/6"} onSubmit={handleSubmit}>

            {inputs.map((input) => {
                return <ProductFormInput key={input.id} {...input} productFormData={productFormData} setProductFormData={setProductFormData} />
            })}

            <ValueFormInput productFormData={productFormData} setProductFormData={setProductFormData} />

            <div className={"w-2/4 h-24 flex justify-evenly items-center md:max-lg:justify-start md:max-lg:items-center md:max-lg:w-1/4"}>
                <button className={"h-10 w-full rounded-full hover:scale-105 transition-all md:max-lg:w-4/5 md:max-lg:h-12 text-white bg-sky-600 hover:bg-blue-500"} >Adicionar</button>
            </div>
        </form>
    )
}

export default ProductForm