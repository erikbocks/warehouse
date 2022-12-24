import { React, useState } from 'react'
import { Link } from "react-router-dom"
import '../styles/LoginForm.css'

function LoginForm(props) {
    const [loginFormData, setFormData] = useState({
        login: "",
        password: ""
    })

    const date = new Date().toLocaleString()

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
            date: date
        })
    }

    return (
        <div className={'loginFormContainer'}>
            <form onSubmit={handleSubmit}>
                <div className={'email'}>
                    <h3>Email ou Usuário</h3>
                    <input className={"loginCredentialInput"} type={"text"} placeholder="Email ou Usuário" name={"login"} onChange={handleInputChange} required></input>
                </div>
                <div className={'password'}>
                    <h3>Senha</h3>
                    <input className={"loginPasswordInput"} type={"password"} placeholder={"Senha"} name={"password"} onChange={handleInputChange} required></input>
                </div>
                <div className={'submit'}>
                    <button type={"submit"} className={"loginSubmitButton"}>Entrar</button>
                </div>
            </form>
            <div className={'loginLink'}>
                <Link to={"/signup"}>Criar uma conta</Link>
            </div>
        </div>
    )
}

export default LoginForm