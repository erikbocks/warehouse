import { React } from 'react'

function FormInput(props) {

    const {title, type, placeholder, name} = props

    return (
        <div className={'w-screen h-20 flex flex-col  items-center justify-evenly'}>
            <h3 className={'text-xl xl:text-lg'}>{title}</h3>
            <input className={'p-2 w-60 border border-solid rounded-lg border-slate-500 bg-gray-100'} type={type} placeholder={placeholder} name={name} onChange={props.handleInputChange} required></input>
        </div>
    )
}

export default FormInput