import { React } from 'react'
import { InputChangeHandler } from '../utils/InputChangeHandler'

function ProductFormInput(props) {

    const { type, placeholder, name, maxLength, max, min, productFormData, setProductFormData } = props

    return (
        <div className={'w-full h-20 flex justify-evenly items-center sm:max-lg:w-2/4'}>
            <input
                className={'p-2 w-4/5 border border-solid rounded-xl sm:max-lg:w-5/6 sm:max-lg:h-14 xl:w-5/6  border-slate-500 bg-gray-100'}
                type={type}
                placeholder={placeholder}
                name={name}
                maxLength={maxLength}
                max={max}
                min={min}
                onChange={(e) => InputChangeHandler(e, productFormData, setProductFormData)}
                required></input>
        </div>
    )
}

export default ProductFormInput