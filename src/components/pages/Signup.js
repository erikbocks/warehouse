import { React, useState } from 'react'
import { saveUser } from '../../api/axios'
import { Title } from '../Title'
import SignUpForm from '../Forms/SignUpForm'
import ResponseAlert from '../ResponseAlert'

function SignUp() {
    const initialSignupState = {
        email: "",
        username: "",
        password: ""
    }

    const [signupFormData, setSignupFormData] = useState(initialSignupState)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertImage, setAlertImage] = useState({
        imageSrc: "",
        imageAlt: ""
    })
    const [alertTitle, setAlertTitle] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    async function registerUser(data) {
        const saveResponse = await saveUser(data)

        if (saveResponse.status === 400 || saveResponse.status === 403) {
            return setWarningAlert(saveResponse.data.messages)
        }

        if (saveResponse.status === 200) {
            return setSuccessAlert()
        }

        setErrorAlert()
    }

    function setWarningAlert(responseMessage) {
        setAlertTitle("Dados incorretos.")
        setAlertMessage(responseMessage)
        setAlertImage({ imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação" })
        setAlertOpen(true)
    }

    function setSuccessAlert() {
        setAlertTitle("Concluído")
        setAlertMessage("Sua conta foi criada com sucesso!")
        setAlertImage({
            imageSrc: "/correct.png",
            imageAlt: "imagem de círculo com simbolo de correto"
        })
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

    function closeResponseAlert() {
        setAlertOpen(false)
    }

    let alertInfos = {
        open: alertOpen,
        image: alertImage,
        title: alertTitle,
        message: alertMessage
    }

    return (
        <div className={'w-screen h-screen flex flex-col justify-center'}>
            <Title />
            <SignUpForm signupFormData={signupFormData} setSignupFormData={setSignupFormData} onSubmit={registerUser} />
            {alertOpen && <ResponseAlert {...alertInfos} closeFunction={closeResponseAlert} />}
        </div>
    )
}

export default SignUp