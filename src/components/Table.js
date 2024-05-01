import { React, useEffect, useReducer, useState } from 'react'
import { getProducts, removeProduct, saveProduct, updateProduct } from '../api/axios'
import { ConfirmationAlert } from './ConfirmationAlert'
import { PageSelector } from './PageSelector'
import { Link } from 'react-router-dom'
import { ExpirationModal } from './ExpirationModal'
import TableRow from './TableRow'
import ProductForm from './Forms/ProductForm'
import ProductInfoModal from './ProductInfoModal'

function Table() {
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("authToken")

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [forceUpdate, setForceUpdate] = useState(false)
    const [productFormData, setProductFormData] = useState({
        product: "",
        amount: "",
        value: ""
    })
    const [state, dispatch] = useReducer(reducer, {
        productKey: 0,
        clickedProduct: {},
        selectedPage: 0,
        disabledLeft: false,
        disabledRight: false,
        isDeleting: false,
        open: false
    })

    function selectProduct(productKey) {
        dispatch({
            type: "selectProduct",
            id: productKey
        });
    }

    function cleanClickedProduct() {
        dispatch({
            type: "cleanup",
        })
    }

    function incrementPage() {
        dispatch({
            type: "incrementPage"
        })
    }

    function decrementPage() {
        dispatch({
            type: "decrementPage"
        })
    }

    function disableLeftPage() {
        dispatch({
            type: "disableLeft"
        })
    }

    function disableRightPage() {
        dispatch({
            type: "disableRight"
        })
    }

    function changeIsDeleting() {
        dispatch({
            type: "changeDeleting"
        })
    }

    function changeOpen() {
        dispatch({
            type: "changeOpen"
        })
    }

    async function saveNewProduct(e) {
        e.preventDefault()

        const newProduct = {
            product: productFormData.product,
            amount: productFormData.amount,
            value: productFormData.value,
            owner: { id: userId }
        }

        await saveProduct(newProduct, token)
        setForceUpdate(true)
    }

    async function updateEditedProduct(modalProduct) {
        let toUpdateProduct = {
            id: state.productKey,
            product: modalProduct.product,
            amount: modalProduct.amount,
            value: modalProduct.value
        }

        await updateProduct(toUpdateProduct, token)
        setForceUpdate(true)
    }

    async function eraseClickedProduct() {
        await removeProduct(state.productKey, token)
        changeOpen()
        cleanClickedProduct()
        setForceUpdate(true)
    }

    useEffect(() => {
        getProducts(userId, state.selectedPage, token).then((res) => {
            setProducts(res.result.content)
            setTotalPages(res.result.totalPages)
            setForceUpdate(false)
        }).catch(() => {
            return
        })
    }, [userId, forceUpdate, state.selectedPage, token])

    useEffect(() => {
        dispatch({
            type: "resetPages"
        })

        if (state.selectedPage === 0) disableLeftPage()


        if (state.selectedPage === (totalPages - 1)) disableRightPage()
    }, [state.selectedPage, totalPages])

    function reducer(state, action) {
        switch (action.type) {
            case "selectProduct":
                let product = products.find((p) => p.id === action.id);
                return { ...state, productKey: action.id, clickedProduct: product };
            case "cleanup":
                return { ...state, productKey: 0, clickedProduct: {} };
            case "incrementPage":
                return { ...state, selectedPage: state.selectedPage + 1 };
            case "decrementPage":
                return { ...state, selectedPage: state.selectedPage - 1 }
            case "disableLeft":
                return { ...state, disabledLeft: true }
            case "disableRight":
                return { ...state, disabledRight: true, }
            case "resetPages":
                return { ...state, disabledLeft: false, disabledRight: false }
            case "changeDeleting":
                return { ...state, isDeleting: !state.isDeleting }
            case "changeOpen":
                return { ...state, open: !state.open }
            default:
                return state
        }
    }

    return (
        <div className={"w-full h-5/6 flex flex-col justify-evenly items-center"}>
            <div className={'w-full h-1/3 flex justify-center items-center sm:max-lg:h-16 xl:h-20'}>
                <ProductForm productFormData={productFormData} setProductFormData={setProductFormData} saveNewProduct={saveNewProduct} />
            </div>
            <div className={'w-full h-2/5 flex justify-center items-center sm:max-lg:h-2/6 overflow-y'}>
                <table className={"w-11/12 h-full flex flex-col justify-evenly overflow-auto rounded-2xl table-auto border-1 drop-shadow-md bg-white sm:max-lg:w-5/6 xl:w-1/2"} >
                    <thead>
                        <tr className={"w-full flex shadow-md"}>
                            <th className={"p-2 w-1/2"}>Produto</th>
                            <th className={"p-2 w-1/5"}>Qtd</th>
                            <th className={"p-2 w-1/3"}>Valor</th>
                            <th className={"p-2 w-1/4"}>Mais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product) => {
                            return <TableRow key={product.id} product={product} changeOpen={changeOpen} selectProduct={selectProduct} />
                        })}
                    </tbody>
                </table>

                {state.clickedProduct?.id && <ProductInfoModal clickedProduct={state.clickedProduct} cleanup={cleanClickedProduct} updateEditedProduct={updateEditedProduct} changeIsDeleting={changeIsDeleting} />}

                {state.isDeleting && <ConfirmationAlert closeFunction={changeIsDeleting} confirmationFunction={eraseClickedProduct} />}
                {!userId && <ExpirationModal />}
            </div>
            <PageSelector totalPages={totalPages} incrementPage={incrementPage} decrementPage={decrementPage} left={state.disabledLeft} right={state.disabledRight} selectedPage={state.selectedPage} />
            <div className={"w-2/5 h-12 flex justify-center items-center"}>
                <img src={"/user.png"} alt={"Silhueta de uma pessoa dentro de um círculo"}></img>
                <Link className={"text-gray-500 underline"} to={"/account"}>Minha conta</Link>
            </div>
        </div >
    )
}

export default Table