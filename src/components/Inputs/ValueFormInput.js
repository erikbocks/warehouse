import { React, useState } from 'react'
import { currencyMask } from '../utils/CurrencyMask'
import { InputChangeHandler } from '../utils/InputChangeHandler'

function ValueFormInput(props) {
    const { productFormData, setProductFormData } = props
    const [currencyValue, setCurrencyValue] = useState("")

    const handleValueChange = (e) => {
        setCurrencyValue(e.target.value)
    }

    return (
        <div className={'w-full h-20 flex justify-evenly items-center sm:max-lg:w-1/3'}>
            <input
                className={'p-2 w-4/5 border border-solid rounded-xl sm:max-lg:w-5/6 sm:max-lg:h-14 xl:w-5/6 border-slate-500 bg-gray-100'}
                name={"value"}
                type={"text"}
                placeholder={"Valor do Produto"}
                value={"R$ " + currencyValue}
                onChange={(e) => {
                    handleValueChange(currencyMask(e))
                    InputChangeHandler(e, productFormData, setProductFormData)
                }}
                required></input>
        </div>
    )
}

export default ValueFormInput