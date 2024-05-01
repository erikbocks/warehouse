import React from "react"
import { InputChangeHandler } from "../utils/InputChangeHandler"

function ProductEditInput(props) {

    let { label, name, type, placeholder, maxLength, max, min, property, productData, setProductData, disabled } = props

    return (
        <div className={"w-full h-12 flex flex-row justify-evenly items-center"}>
            <span>{label}</span>
            <input
                className={"w-44 h-8 p-2 border border-solid rounded-xl bg-slate-200 disabled:bg-gray-300 disabled:text-zinc-500"}
                name={name}
                type={type}
                placeholder={placeholder}
                value={property}
                disabled={disabled}
                maxLength={maxLength}
                max={max}
                min={min}
                onChange={e => (InputChangeHandler(e, productData, setProductData))}
                required>
            </input>
        </div>
    )
}

export default ProductEditInput