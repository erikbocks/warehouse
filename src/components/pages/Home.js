import { React, useEffect, useReducer, useState } from 'react'
import Table from '../Table'
import { Title } from '../Title'
import { getProducts, removeProduct, saveProduct, updateProduct } from '../../api/axios'
import ProductForm from '../Forms/ProductForm'
import ProductInfoModal from '../ProductInfoModal'
import { ConfirmationAlert } from '../ConfirmationAlert'
import { ExpirationModal } from '../ExpirationModal'
import { PageSelector } from '../PageSelector'
import { Link } from 'react-router-dom'

function Home() {
    const token = sessionStorage.getItem("authToken")
    const initialStates = {
        productFormData: {
            productName: "",
            amount: "",
            value: ""
        },
        productModalData: {
            id: 0,
            productName: "",
            amount: "",
            value: "",
            createdOn: "",
            lastEdit: "",
            owner: {}
        }
    }

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [forceUpdate, setForceUpdate] = useState(false)
    const [productFormData, setProductFormData] = useState(initialStates.productFormData)
    const [productModalData, setProductModalData] = useState(initialStates.productModalData)

    const [state, dispatch] = useReducer(reducer, {
        productKey: 0,
        clickedProduct: {},
        selectedPage: 0,
        disabledLeft: false,
        disabledRight: false,
        isEditingProduct: false,
        isDeleting: false,
        modalFieldsDisabled: true
    })

    function reducer(state, action) {
        switch (action.type) {
            case "selectProduct":
                let product = products.find((p) => p.id === action.id);
                setProductModalData({ ...product })
                return { ...state, productKey: action.id, clickedProduct: product };
            case "cancelProductEditing":
                setProductModalData({ ...state.clickedProduct })
                return { ...state, modalFieldsDisabled: !state.modalFieldsDisabled, isEditingProduct: !state.isEditingProduct }
            case "setIsEditingProduct":
                return { ...state, modalFieldsDisabled: !state.modalFieldsDisabled, isEditingProduct: !state.isEditingProduct }
            case "resetClickedProduct":
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
            default:
                return state
        }
    }

    function selectProduct(productKey) {
        dispatch({
            type: "selectProduct",
            id: productKey
        });
    }

    function resetClickedProduct() {
        dispatch({
            type: "resetClickedProduct",
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

    function toggleEditingProduct() {
        dispatch({
            type: "setIsEditingProduct"
        })
    }

    function cancelProductEditing() {
        dispatch({
            type: "cancelProductEditing"
        })
    }

    function changeIsDeleting() {
        dispatch({
            type: "changeDeleting"
        })
    }

    async function saveNewProduct(event) {
        event.preventDefault()

        const newProduct = {
            product: productFormData.productName,
            amount: productFormData.amount,
            value: productFormData.value,
        }

        await saveProduct(newProduct, token)
        setForceUpdate(true)
    }

    async function updateEditedProduct(event) {
        event.preventDefault()

        let toUpdateProduct = {
            id: state.productKey,
            product: productModalData.productName,
            amount: productModalData.amount,
            value: productModalData.value
        }

        await updateProduct(toUpdateProduct, token)
        setForceUpdate(true)
    }

    async function removeClickedProduct() {
        await removeProduct(state.productKey, token)
        resetClickedProduct()
        setForceUpdate(true)
    }

    useEffect(() => {
        getProducts(state.selectedPage, token).then((response) => {
            setProducts(response.result.content)
            setTotalPages(response.result.totalPages)
            setForceUpdate(false)
        }).catch(() => {
            return
        })
    }, [forceUpdate, state.selectedPage, token])

    useEffect(() => {
        dispatch({
            type: "resetPages"
        })

        if (state.selectedPage === 0) disableLeftPage()

        if (state.selectedPage === (totalPages - 1)) disableRightPage()
    }, [state.selectedPage, totalPages])

    return (
        <div className={'w-screen h-screen flex flex-col justify-center overflow-hidden'}>
            <Title />
            <div className={"w-full h-5/6 flex flex-col justify-evenly items-center"}>
                <div className={'w-full h-1/3 flex justify-center items-center sm:max-lg:h-16 xl:h-20'}>
                    <ProductForm productFormData={productFormData} setProductFormData={setProductFormData} saveNewProduct={saveNewProduct} />
                </div>

                <Table products={products} selectProduct={selectProduct} />

                {state.clickedProduct?.id && <ProductInfoModal productModalData={productModalData} setProductModalData={setProductModalData} modalFieldsDisabled={state.modalFieldsDisabled} isEditingProduct={state.isEditingProduct} toggleEditingProduct={toggleEditingProduct} cancelProductEditing={cancelProductEditing} resetClickedProduct={resetClickedProduct} updateEditedProduct={updateEditedProduct} changeIsDeleting={changeIsDeleting} />}

                {state.isDeleting && <ConfirmationAlert closeFunction={changeIsDeleting} confirmationFunction={removeClickedProduct} />}

                <PageSelector totalPages={totalPages} incrementPage={incrementPage} decrementPage={decrementPage} left={state.disabledLeft} right={state.disabledRight} selectedPage={state.selectedPage} />
                <div className={"w-2/5 h-12 flex justify-center items-center"}>
                    <img src={"/user.png"} alt={"Silhueta de uma pessoa dentro de um círculo"}></img>
                    <Link className={"text-gray-500 underline"} to={"/account"}>Minha conta</Link>
                </div>
                {!token && <ExpirationModal />}
            </div>
        </div>
    )
}

export default Home