import { React } from 'react'
import { Link } from "react-router-dom"
import { BaseWhiteBox } from '../BaseWhiteBox'
import UserFormInput from '../Inputs/UserFormInput'

function LoginForm(props) {
    const { loginFormData, setLoginFormData } = props

    const inputs = [
        {
            id: 1,
            title: "Email ou Usuário",
            type: "text",
            placeholder: "Email ou Usuário",
            name: "login",
            maxLength: 40
        },
        {
            id: 2,
            title: "Senha",
            type: "password",
            placeholder: "Senha",
            autoComplete: "current-password",
            name: "password"
        }
    ]

    function handleSubmit(event) {
        event.preventDefault()

        props.onSubmit({
            login: loginFormData.login,
            password: loginFormData.password,
        })
    }

    return (
        <div className={'h-2/4 flex flex-col items-center'}>
            <BaseWhiteBox styleClass={"w-3/4 h-full sm:max-lg:w-1/2 sm:h-4/5 xl:w-1/5 xl:h-full "}>
                <form className={'h-4/6 w-1/5 flex flex-col justify-between items-center'} onSubmit={handleSubmit}>
                    {inputs.map((input) => {
                        return <UserFormInput key={input.id} {...input} formData={loginFormData} setFormData={setLoginFormData} />
                    })}
                    <div className={'w-32 h-20 flex justify-center items-center'}>
                        <button type={"submit"} className={"h-12 w-24 rounded-full hover:scale-105 transition-all text-white bg-sky-600 hover:bg-blue-500"}>Entrar</button>
                    </div>
                </form>
                <p>
                    Não tem uma conta?
                </p>
                <Link className={'h-10 text-base underline text-sky-600'} to={"/signup"}> Criar uma conta!</Link>
            </BaseWhiteBox >
        </div >
    )
}

export default LoginForm