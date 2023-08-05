import { React, useState } from 'react'
import { Link } from "react-router-dom"

function LoginForm(props) {
    const [loginFormData, setFormData] = useState({
        login: "",
        password: ""
    })

    // lida com a mudança do input
    const handleInputChange = (event) => {
        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        setFormData({
            ...loginFormData,
            [fieldName]: fieldValue
        })
    }

    // lida com o envio do formulário
    function handleSubmit(event) {
        event.preventDefault()

        props.onSubmit({
            login: loginFormData.login,
            password: loginFormData.password,
        })
    }

    return (
        <div className={'h-96 flex flex-col items-center '}>
            <form className={'h-72 w-screen flex flex-col justify-evenly items-center'} onSubmit={handleSubmit}>

                <div className='w-screen h-20 flex flex-col  items-center justify-evenly'>
                    <p className='text-xl'>Email ou Usuário</p>
                    <input className={"p-2 w-60 border  border-solid rounded-lg border-slate-400 bg-gray-100"} type={"text"} placeholder={"Email ou Usuário"} name={"login"} onChange={handleInputChange} required></input>
                </div>

                <div className={'h-20 w-screen flex flex-col items-center justify-evenly'}>
                    <p className={'text-xl'}>Senha</p>
                    <input className={"p-2 w-60 border  border-solid rounded-lg border-slate-400 bg-gray-100"} type={"password"} placeholder={"Senha"} name={"password"} onChange={handleInputChange} required></input>
                </div>

                <div className={'w-32 h-20 flex justify-center items-center '}>
                    <button type={"submit"} className={"h-9 w-24 rounded-full hover:scale-105 transition-all text-white hover:bg-sky-600 bg-blue-400"}>Entrar</button>
                </div>

            </form>
            <Link className={'h-10 text-base underline text-blue-500'}to={"/signup"}>Criar uma conta</Link>
        </div>
    )
}

export default LoginForm