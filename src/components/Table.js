import { React, useEffect, useState } from 'react'
import { saveProduct, getProducts, removeProduct } from '../api/axios'
import { nanoid } from 'nanoid'
import TableRow from './TableRow'
import ProductFormInput from './ProductFormInput'
import ValueFormInput from './ValueFormInput'

function Table() {
    const userId = sessionStorage.getItem("userId")
    const [products, setProducts] = useState([])
    const [forceUpdate, setForceUpdate] = useState(true)
    const [productKey, setProductKey] = useState()
    const [open, setOpen] = useState(false)

    const [productFormData, setProductFormData] = useState({
        product: "",
        amount: "",
        value: ""
    })

    useEffect(() => {
        getProducts(userId).then((res) => {
            setProducts(res)
            setForceUpdate(false)
        })
    }, [userId, forceUpdate])

    useEffect(() => {
        deleteRow(productKey)
    }, [productKey])

    const handleProductFormChange = (e) => {

        const fieldName = e.target.getAttribute('name')
        const fieldValue = e.target.value

        setProductFormData({
            ...productFormData,
            [fieldName]: fieldValue
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const newProduct = {
            item_id: nanoid(),
            item: productFormData.product,
            amount: productFormData.amount,
            owner_id: userId
        }

        await saveProduct(newProduct)

        setForceUpdate(true)
    }

    async function deleteRow(item_id) {
        if (!item_id) {
            return
        }

        await removeProduct(item_id)

        setForceUpdate(true)
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

    // console.log(products)

    return (
        <div className='h-full'>
            <div className={'w-full h-2/6 flex justify-center xl:h-1/6 md:max-lg:h-1/6 '}>
                <form className={"h-full w-full flex flex-col items-center md:max-lg:h-1/5 md:max-lg:flex-row xl:h-1/5 xl:flex-row xl:w-4/6"} onSubmit={handleSubmit}>

                    {inputs.map((input) => {
                        return <ProductFormInput key={input.id} {...input} handleProductFormChange={handleProductFormChange} />
                    })}

                    <ValueFormInput productFormData={productFormData} setProductFormData={setProductFormData} handleProductFormChange={handleProductFormChange} />

                    <div className={"w-2/4 h-20 flex justify-evenly items-center md:max-lg:justify-start md:max-lg:items-center md:max-lg:w-1/4"}>
                        <button className={"h-10 w-full rounded-full hover:scale-105 transition-all md:max-lg:w-4/5 md:max-lg:h-12 text-white bg-sky-600 hover:bg-blue-500"} >Adicionar</button>
                    </div>
                </form>
            </div>

            <div className={'tableContainer'}>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th className={"tableHead"}>Produto</th>
                            <th className={"tableHead"}>Quantidade</th>
                            <th className={"tableHead"}>Cadastrado em</th>
                            <th className={"tableHead"}>Ultima Edição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow products={products} setProductKey={setProductKey} setOpen={setOpen} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table