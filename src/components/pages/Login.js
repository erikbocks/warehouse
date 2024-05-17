import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/axios';
import LoginForm from '../Forms/LoginForm';
import ResponseAlert from '../ResponseAlert';
import { Title } from '../Title';

function Login() {
    const pageNavigator = useNavigate()
    const initialLoginState = {
        login: "",
        password: ""
    }

    const [loginFormData, setLoginFormData] = useState(initialLoginState)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertImage, setAlertImage] = useState({
        imageSrc: "",
        imageAlt: ""
    })
    const [alertTitle, setAlertTitle] = useState("")
    const [alertMessage, setAlertMessage] = useState("")


    async function loginUser(data) {
        const authResponse = await authenticateUser(data)

        if (authResponse.status === 400 || authResponse.status === 403) {
            return setWarningAlert()
        }

        if (authResponse.status === 200) {
            setSuccessAlert()
            return redirectToHome(authResponse)
        }

        setErrorAlert()
    }

    function setWarningAlert() {
        setAlertImage({ imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação" })
        setAlertTitle("Dados incorretos")
        setAlertMessage("Login ou Senha incorretos.")
        setAlertOpen(true)
    }

    function setSuccessAlert() {
        setAlertImage({ imageSrc: "/correct.png", imageAlt: "imagem de círculo com simbolo de correto" })
        setAlertTitle("Autenticado!")
        setAlertMessage("Você vai ser redirecionado em alguns instantes.")
        setAlertOpen(true)
    }

    function setErrorAlert() {
        setAlertImage({
            imageSrc: "/error.png",
            imageAlt: "imagem de um sinal de erro"
        })
        setAlertTitle("Erro")
        setAlertMessage("Ocorreu um erro. Tente novamente mais tarde")
        setAlertOpen(true)
    }

    function redirectToHome(response) {
        sessionStorage.setItem('authToken', `Bearer ${response.result.token}`)

        setTimeout(() => pageNavigator('/home'), 5000)
    }

    function closeResponseAlert() {
        setAlertOpen(false)
    }

    const alertInfos = {
        image: alertImage,
        title: alertTitle,
        message: alertMessage,
    }

    return (
        <div className={'w-screen h-screen flex flex-col items-center justify-center overflow-hidden'}>
            <Title />
            <LoginForm loginFormData={loginFormData} setLoginFormData={setLoginFormData} onSubmit={loginUser} />
            {alertOpen && <ResponseAlert {...alertInfos} closeFunction={closeResponseAlert} />}
        </div>
    )
}

export default Login;