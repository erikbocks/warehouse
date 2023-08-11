import { React } from 'react'
import currencyMask from '../utils/CurrencyMask'

function ValueFormInput(props) {

    let { productFormData, handleProductFormChange } = props

    return (
        <div className={'w-full  h-20 flex justify-evenly items-center md:max-lg:w-1/3  '}>
            <input
                className={'p-2 w-4/5 border border-solid rounded-xl md:max-lg:w-5/6 md:max-lg:h-14 xl:w-5/6 border-slate-500 bg-gray-100'}
                type={"text"}
                placeholder={"Valor do Produto"}
                name={"value"}
                value={"R$ " + productFormData.value}
                onChange={(e) => handleProductFormChange(currencyMask(e))}
                required></input>
        </div>
    )
}


export default ValueFormInput