import { React, useEffect, useState } from 'react'
import { saveProduct, getProducts, removeProduct } from '../api/axios'
import { nanoid } from 'nanoid'
import TableRow from './TableRow'
import ModalEditProduct from './ModalEditProduct'
import '../styles/Table.css'

function Table() {
    const userId = sessionStorage.getItem("userId")
    const [products, setProducts] = useState([])
    const [forceUpdate, setForceUpdate] = useState(true)
    const [productKey, setProductKey] = useState()
    const [open, setOpen] = useState(false)
    const [productBeingEdited, setproductBeingEdited] = useState()

    const [productFormData, setProductFormData] = useState({
        product: "",
        amount: "",
    })

    // faz um GET nos produtos cadastrados com o ID do usuário
    useEffect(() => {
        getProducts(userId).then((res) => { // res = lista de produtos
            setProducts(res)
            setForceUpdate(false)
        })
    }, [userId, forceUpdate])

    // lida com a mudança do state e deleta o produto escolhido.
    useEffect(() => {
        deleteRow(productKey)
    }, [productKey])

    // lida com a mudança do input
    const handleProductFormChange = (e) => {

        const fieldName = e.target.getAttribute('name')
        const fieldValue = e.target.value

        setProductFormData({
            ...productFormData,
            [fieldName]: fieldValue
        })
    }

    // lida com o envio do formulário e salva o novo produto
    async function handleSubmit(e) {
        e.preventDefault()

        const added_on = new Date().toLocaleString()
        const last_edit = new Date().toLocaleString()

        const newProduct = {
            item_id: nanoid(),
            item: productFormData.product,
            amount: productFormData.amount,
            added_on: added_on,
            last_edit: last_edit,
            owner_id: userId
        }

        await saveProduct(newProduct)

        setForceUpdate(true)
    }

    // deleta a linha do banco
    async function deleteRow(item_id) {
        if (!item_id) {
            return
        }

        await removeProduct(item_id)

        setForceUpdate(true)
    }

    return (
        <>
            <div className={'formContainer'}>
                <form onSubmit={handleSubmit}>
                    <div className={'productsInputsDiv'}>
                        <div>
                            <input className={"productNameInput"} type={"text"} placeholder={"Nome do Produto"} name={"product"} onChange={handleProductFormChange} minLength={1} maxLength={50} required ></input>
                        </div>
                        <div>
                            <input className={"productAmountInput"} type={"number"} placeholder={"Quantidade"} name={"amount"} onChange={handleProductFormChange} min={1} max={9999} required></input>
                        </div>
                        <div>
                            <button className={"productSubmitButton"} >Adicionar</button>
                        </div>
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
                        <TableRow products={products} setProductKey={setProductKey} setProductId={setproductBeingEdited} setOpen={setOpen} />
                        {open && <ModalEditProduct setForceUpdate={setForceUpdate} productBeingEdited={productBeingEdited} open={open} setOpen={setOpen} />}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table