import { React } from 'react'
import { InputChangeHandler } from '../../utils/InputChangeHandler'

function UserFormInput(props) {

    const { title, type, placeholder, name, formData, setFormData } = props

    return (
        <div className={'w-screen h-20 flex flex-col items-center justify-evenly'}>
            <h3 className={'text-xl xl:text-lg'}>{title}</h3>
            <input className={'p-2 w-60 border border-solid rounded-xl border-slate-500 bg-gray-100'} type={type} placeholder={placeholder} name={name} onChange={(e) => InputChangeHandler(e, formData, setFormData)} required></input>
        </div>
    )
}

export default UserFormInput