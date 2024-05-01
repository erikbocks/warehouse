import { React, useState } from 'react'
import { Link } from "react-router-dom"
import UserFormInput from '../Inputs/UserFormInput'
import { BaseWhiteBox } from '../BaseWhiteBox'

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
            name: "email",
            autocomplete: "email",
            maxLength: 40
        },
        {
            id: 2,
            title: "Usuário",
            type: "text",
            placeholder: "Usuário",
            name: "username",
            autocomplete: "username",
            maxLength: 20
        },
        {
            id: 3,
            title: "Senha",
            type: "password",
            placeholder: "Senha",
            name: "password",
            autocomplete: "new-password",
            maxLength: 20
        }
    ]

    function handleSubmit(e) {
        e.preventDefault()

        props.onSubmit({
            email: signupFormData.email,
            username: signupFormData.username,
            password: signupFormData.password
        })
    }

    return (
        <div className={'h-2/4 flex flex-col items-center'}>
            <BaseWhiteBox styleClass={"w-3/4 h-full sm:max-lg:w-1/2 sm:max-lg:h-4/5 xl:w-1/5"}>
                <form className={'h-full w-1/5 flex flex-col justify-evenly items-center '} onSubmit={handleSubmit}>
                    {inputs.map((input) => {
                        return <UserFormInput key={input.id} {...input} formData={signupFormData} setFormData={setSignupFormData} />
                    })}
                    <div className={'w-32 h-20 flex justify-center items-center'} >
                        <button className={"h-12 w-24 rounded-full hover:scale-105 transition-all text-white bg-sky-600 hover:bg-blue-500"} type={"submit"} >Cadastrar</button>
                    </div>
                </form>
                <span className={'w-full h-14 text-center'}>
                    Ja é cadastrado?
                    <Link className={'h-10 text-base underline text-blue-500'} to="/"> Fazer login</Link>
                </span>
            </BaseWhiteBox >
        </div>
    )
}

export default SignUpForm