import { React, useEffect, useState } from 'react'
import { getProducts, removeProduct, updateProduct } from '../api/axios'
import { ConfirmationAlert } from './ConfirmationAlert'
import TableRow from './TableRow'
import ProductForm from './Forms/ProductForm'
import ProductInfoModal from './ProductInfoModal'
import { PageSelector } from './PageSelector'
import { Link } from 'react-router-dom'

function Table() {
    const userId = sessionStorage.getItem("userId")

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [selectedPage, setSelectedPage] = useState(0)
    const [pagesDisabled, setPagesDisabled] = useState({
        left: false,
        right: false
    })
    const [clickedProduct, setClickedProduct] = useState({})
    const [open, setOpen] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(false)
    const [productKey, setProductKey] = useState(0)
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    const [productFormData, setProductFormData] = useState({
        product: "",
        amount: "",
        value: ""
    })

    function cleanClickedProduct() {
        setClickedProduct({})
        setProductKey(0)
    }

    async function updateEditedProduct(modalProduct) {

        let toUpdateProduct = {
            id: productKey,
            product: modalProduct.product,
            amount: modalProduct.amount,
            value: modalProduct.value
        }

        await updateProduct(toUpdateProduct)

        setForceUpdate(true)
    }

    async function eraseClickedProduct() {
        await removeProduct(productKey)
        setOpen(false)
        cleanClickedProduct()
        setForceUpdate(true)
    }

    function incrementPage() {
        setSelectedPage(selectedPage + 1)
    }

    function decrementPage() {
        setSelectedPage(selectedPage - 1)
    }

    useEffect(() => {
        getProducts(userId, selectedPage).then((res) => {
            setProducts(res.result.content)
            setTotalPages(res.result.totalPages)
            setForceUpdate(false)
        })
    }, [userId, forceUpdate, selectedPage])

    useEffect(() => {
        setClickedProduct(products.find((product) => product.id === productKey))
    }, [productKey])

    useEffect(() => {

        setPagesDisabled({ left: false, right: false })

        if (selectedPage === 0) setPagesDisabled({ ...pagesDisabled, left: true })


        if (selectedPage === (totalPages - 1)) setPagesDisabled({ ...pagesDisabled, right: true })

    }, [selectedPage])

    return (
        <div className={"w-full h-5/6 flex flex-col justify-center items-center "}>
            <div className={'w-full h-2/6 flex justify-center items-center md:max-lg:h-24 xl:h-20 '}>
                <ProductForm productFormData={productFormData} setProductFormData={setProductFormData} userId={userId} setForceUpdate={setForceUpdate} />
            </div>
            <div className={'w-full h-72 flex justify-center items-center'}>
                <table className={"w-11/12 h-2/6 rounded-2xl table-fixed border-1 drop-shadow-md bg-white md:max-lg:w-5/6 xl:w-2/3"}>
                    <thead>
                        <tr className={"w-full shadow-md"}>
                            <th className={"p-2"}>Produto</th>
                            <th className={"p-2"}>Qtd</th>
                            <th className={"p-2"}>Valor</th>
                            {window.innerWidth > 768 && <th className={"p-2"}>Adicionado em</th>}
                            {window.innerWidth > 768 && <th className={"p-2"}>Ultima edição</th>}
                            <th className={"p-2"}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product) => {
                            return <TableRow key={product.id} product={product} setOpen={setOpen} setProductKey={setProductKey} />
                        })}
                    </tbody>
                </table>
                {clickedProduct?.id && <ProductInfoModal clickedProduct={clickedProduct} productKey={productKey} open={open} setOpen={setOpen} cleanup={cleanClickedProduct} updateEditedProduct={updateEditedProduct} setOpenDeleteConfirmation={setOpenDeleteConfirmation} />}
                {openDeleteConfirmation && <ConfirmationAlert setOpenDeleteConfirmation={setOpenDeleteConfirmation} eraseClickedProduct={eraseClickedProduct} />}
            </div>
            <PageSelector totalPages={totalPages} incrementPage={incrementPage} decrementPage={decrementPage} pagesDisabled={pagesDisabled} selectedPage={selectedPage} />
            <div className={"w-2/5 h-12 flex justify-center items-center"}>
                <img src={"/user.png"} alt={"Silhueta de uma pessoa dentro de um círculo"}></img>
                <Link className={"text-gray-500 underline"} to={"/account"}>Minha conta</Link>
            </div>
        </div >
    )
}

export default Table