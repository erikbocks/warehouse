import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser} from '../api/axios';
import LoginForm from '../components/LoginForm';
import ResponseAlert from '../components/ResponseAlert';
import Title from '../components/Title';

function Login() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    let [image, setImage] = useState({
        imageSrc: "/error.png",
        imageAlt: "imagem de um sinal de erro"
    })
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde.")

    async function checkLogin(data) {

        let query = await checkUser(data)

        if (query === undefined) {
            setOpen(true)
            return query
        }

        if (query === null) {
            setImage({imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação"})
            setTitle("Dados incorretos")
            setMessage("Login ou Senha incorretos.")
            setOpen(true)
            return query
        }

        if (query != null) {
            setImage({imageSrc: "/correct.png", imageAlt: "imagem de círculo com simbolo de correto"})
            setTitle("Autenticado!")
            setMessage("Você vai ser redirecionado em alguns instantes.")
            setOpen(true)
            return query
        }
    }

    async function redirect(data) {
        let check = await checkLogin(data)

        if (check !== undefined) {

            sessionStorage.setItem('userId', JSON.stringify(check.id))

            setTimeout(()=> navigate('/home'), 5000)
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
            <LoginForm  onSubmit={redirect}/>  
            <ResponseAlert data={infos} visible={open} setOpen={setOpen} />
        </div>
    )
}

export default Login