import { React, useState } from 'react'
import { Link } from "react-router-dom"
import FormInput from './InputForm'

function LoginForm(props) {
    const [loginFormData, setFormData] = useState({
        login: "",
        password: ""
    })

    const inputs = [
        {
            id: 1,
            title: "Email ou Usuário",
            type: "text",
            placeholder: "Email ou Usuário",
            name: "login"
        },
        {
            id: 2,
            title: "Senha",
            type: "password",
            placeholder: "Senha",
            name: "password"
        }
    ]

    const handleInputChange = (event) => {
        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        setFormData({
            ...loginFormData,
            [fieldName]: fieldValue
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        props.onSubmit({
            login: loginFormData.login,
            password: loginFormData.password,
        })
    }

    return (
        <div className={'h-2/4 flex flex-col items-center'}>
            <div className={'bg-white rounded-3xl flex justify-evenly flex-col w-5/6 md:max-lg:w-3/6 md:max-lg:h-3/4 xl:w-1/5 h-full items-center border-2 drop-shadow-md '}>
                <form className={'h-4/6 w-1/5 flex flex-col justify-between items-center'} onSubmit={handleSubmit}>
                    {inputs.map((input) => {
                        return <FormInput key={input.id} {...input} handleInputChange={handleInputChange} />
                    })}
                    <div className={'w-32 h-20 flex justify-center items-center'}>
                        <button type={"submit"} className={"h-12 w-24 rounded-full hover:scale-105 transition-all text-white bg-sky-600 hover:bg-blue-500"}>Entrar</button>
                    </div>
                </form>
                <span>
                    Não tem uma conta?
                    <Link className={'h-10 text-base underline text-blue-500'} to={"/signup"}> Criar uma conta!</Link>
                </span>
            </div>
        </div>
    )
}

export default LoginForm