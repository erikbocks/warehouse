import { React } from "react"
import { currencyMask } from '../utils/CurrencyMask'
import { InputChangeHandler } from "../utils/InputChangeHandler"

function ProductValueEditInput(props) {
    let { productData, setProductData, disabled } = props

    return (
        <div className={"w-full h-12 flex flex-row justify-evenly items-center "}>
            <span>Valor: </span>
            <input
                className={"w-44 h-8 p-2 border border-solid rounded-xl bg-slate-200 disabled:bg-gray-300 disabled:text-zinc-500"}
                name={"value"}
                type={"text"}
                placeholder={"Valor do Produto"}
                value={"R$ " + productData.value}
                onChange={(e) => {
                    currencyMask(e)
                    InputChangeHandler(e, productData, setProductData)
                }}
                disabled={disabled}
                required></input>
        </div>
    )
}

export default ProductValueEditInput