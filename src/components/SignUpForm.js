import { React, useState } from 'react'
import { Link } from "react-router-dom"
import UserFormInput from './UserFormInput'

function SignUpForm(props) {

    const [signupFormData, setSignupFormData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const inputs = [
        {
            id: 1,
            title: "Email",
            type: "email",
            placeholder: "Email",
            name: "email"
        },
        {
            id: 2,
            title: "Usuário",
            type: "text",
            placeholder: "Usuário",
            name: "username"
        },
        {
            id: 3,
            title: "Senha",
            type: "password",
            placeholder: "Senha",
            name: "password"
        }
    ]

    const handleInputChange = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        setSignupFormData({
            ...signupFormData,
            [fieldName]: fieldValue
        })
    }

    const verifyInfo = (data) => {

        let message = ""
        const emailRegex = /^[a-zA-Z0-9._]{3,20}@[a-zA-Z]+(?:.[a-zA-Z0-9-])+$/
        const usernameRegex = /^[a-zA-Z0-9_.]{4,20}$/
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/

        if (!emailRegex.test(data.email)) {
            message = "Insira um valor de email valido."
            return message
        }

        if (!usernameRegex.test(data.username)) {
            message = "Seu usuário deve de 4 a 20 letras de A-Z, números e apenas os caracteres ( _ e .)"
            return message
        }

        if (!passwordRegex.test(data.password)) {
            message = "Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número, um caractere especial ('!@#$%^&*') e estar entre 8-20 caracteres."
            return message
        }

        return message
    }

    function handleSubmit(e) {
        e.preventDefault()

        let message = verifyInfo(signupFormData)

        props.onSubmit({
            email: signupFormData.email,
            username: signupFormData.username,
            password: signupFormData.password,
            message: message
        })
    }

    return (
        <div className={'h-2/4 flex flex-col items-center'}>
            <div className={'bg-white rounded-3xl flex justify-evenly flex-col w-5/6 md:max-lg:w-2/4 md:max-lg:h-3/4 xl:w-1/5 xl:h-full items-center border-2 drop-shadow-md p-5'}>
                <form className={'h-full w-1/5 flex flex-col justify-evenly items-center '} onSubmit={handleSubmit}>
                    {inputs.map((input) => {
                        return <UserFormInput key={input.id} {...input} handleInputChange={handleInputChange} />
                    })}
                    <div className={'w-32 h-20 flex justify-center items-center'} >
                        <button className={"h-12 w-24 rounded-full hover:scale-105 transition-all text-white bg-sky-600 hover:bg-blue-500"} type={"submit"} >Cadastrar</button>
                    </div>
                </form>
                <span className={'w-full h-14 text-center'}>
                    Ja é cadastrado?
                    <Link className={'h-10 text-base underline text-blue-500'} to="/"> Fazer login</Link>
                </span>
            </div>
        </div>
    )
}

export default SignUpForm