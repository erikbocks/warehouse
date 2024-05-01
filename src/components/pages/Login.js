import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../api/axios';
import LoginForm from '../Forms/LoginForm';
import ResponseAlert from '../ResponseAlert';
import Title from '../Title';

function Login() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde.")
    let [image, setImage] = useState({
        imageSrc: "/error.png",
        imageAlt: "imagem de um círculo com um X no centro indicando erro"
    })

    async function checkLogin(data) {
        let response = await checkUser(data)

        if (response.status === 400) {
            setImage({ imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação" })
            setTitle("Dados incorretos")
            setMessage("Login ou Senha incorretos.")
            setOpen(true)
            return response
        }

        if (response.status === 200) {
            setImage({ imageSrc: "/correct.png", imageAlt: "imagem de círculo com simbolo de correto" })
            setTitle("Autenticado!")
            setMessage("Você vai ser redirecionado em alguns instantes.")
            setOpen(true)
            return response
        }

        setOpen(true)
        return response
    }

    async function redirect(data) {
        let response = await checkLogin(data)

        if (response.result !== undefined && response.result !== null) {

            sessionStorage.setItem('userId', JSON.stringify(response.result.id))
            sessionStorage.setItem('authToken', `Bearer ${response.result.token}`)

            setTimeout(() => navigate('/home'), 5000)
        }
    }

    let infos = {
        image: image,
        title: title,
        message: message,
    }

    return (
        <div className={'w-screen h-screen flex flex-col items-center justify-center overflow-hidden'}>
            <Title />
            <LoginForm onSubmit={redirect} />
            {open && <ResponseAlert data={infos} visible={open} setOpen={setOpen} />}
        </div>
    )
}

export default Login