import { React } from 'react'
import { InputChangeHandler } from '../utils/InputChangeHandler'

function UserFormInput(props) {

    const { title, type, name, value, maxLength, autocomplete, formData, setFormData, disabled } = props

    return (
        <div className={'w-screen h-20 flex flex-col items-center justify-evenly'}>
            <h3 className={'text-xl xl:text-lg'}>{title}</h3>
            <input className={'p-2 w-60 border border-solid rounded-xl border-slate-500 bg-gray-100 disabled:bg-gray-300 disabled:text-zinc-500'} type={type} name={name} value={value} onChange={e => InputChangeHandler(e, formData, setFormData)} disabled={disabled} autoComplete={autocomplete} maxLength={maxLength} required></input>
        </div>
    )
}

export default UserFormInput