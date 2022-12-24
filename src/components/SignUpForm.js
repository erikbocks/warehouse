import { React, useState } from 'react'
import { Link } from "react-router-dom"
import '../styles/SignUpForm.css'

function SignUpForm(props) {

    const [signupFormData, setSignupFormData] = useState({
        email: "",
        password: "",
        user: ""
    })

    const date = new Date().toLocaleString()

    const handleSignupFormData = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        setSignupFormData({
            ...signupFormData,
            [fieldName]: fieldValue
        })
    }

    const verifyInfo = (data) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const userRegex = /^[a-zA-Z0-9_.]{4,25}$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`-]{8,25}$/

        if (!emailRegex.test(data.email)) {
            try {
                alert("Digite um endereço de email valido.")
                return
            } catch (error) {
                console.error(error)
            }
        }

        if (!userRegex.test(data.user)) {
            try {
                alert("Seu usuário deve de 4 a 25 , letras de A-Z, números e apenas os caracteres ( _ e .)")
                return
            } catch (error) {
                console.error(error)
            }
        }

        if (!passwordRegex.test(data.password)) {
            try {
                alert("Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial ('!@#$%^&*') e estar entre 8-25 caracteres.")
                return
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        verifyInfo(signupFormData)

        props.onSubmit({
            email: signupFormData.email,
            password: signupFormData.password,
            user: signupFormData.user,
            date: date
        })
    }

    return (
        <div className={'signUpContainer'}>
            <form onSubmit={handleSubmit}>
                <div className={'signUpEmailDiv'}>
                    <h3>Email</h3>
                    <input className={"signUpEmailInput"} type={"email"} placeholder={"Email"} name={"email"} onChange={handleSignupFormData} required></input>
                </div>

                <div className={'signUpPasswordDiv'}>
                    <h3>Senha</h3>
                    <input className={"signUpPasswordInput"} type={"password"} placeholder={"Senha"} name={"password"} onChange={handleSignupFormData} required></input>
                </div>

                <div className={'signUpUserDiv'}>
                    <h3>Usuário</h3>
                    <input className={"signUpUserInput"} type={"text"} placeholder={"Usuário"} name={"user"} onChange={handleSignupFormData} required></input>
                </div>

                <div className={'submit'}>
                    <button type={"submit"} className={"signUpSubmitButton"}>Cadastrar</button>
                </div>

            </form>
            <div className={'loginLink'}>
                <Link to="/">Entrar</Link>
            </div>
        </div>
    )
}

export default SignUpForm