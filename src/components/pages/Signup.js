import { React, useState } from 'react'
import Title from '../Title'
import { saveUser } from '../../api/axios'
import SignUpForm from '../Forms/SignUpForm'
import ResponseAlert from '../ResponseAlert'


function SignUp() {
    const [open, setOpen] = useState(false)
    let [image, setImage] = useState({
        imageSrc: "/error.png",
        imageAlt: "imagem de um sinal de erro"
    })
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde")

    async function registerUser(data) {

        let response = await saveUser(data)

        if (response.status === 400) {
            setTitle("Dados incorretos.")
            setMessage(response.data.messages)
            setImage({ imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação" })
            setOpen(true)
            return
        }

        if (response.status === 201) {
            setTitle("Concluído")
            setMessage("Sua conta foi criada com sucesso!")
            setImage({
                imageSrc: "/correct.png",
                imageAlt: "imagem de círculo com simbolo de correto"
            })
            setOpen(true)
        }

        setOpen(true)
        return
    }

    let infos = {
        open: open,
        image: image,
        title: title,
        message: message
    }

    return (
        <div className={'w-screen h-screen flex flex-col justify-center'}>
            <Title />
            <SignUpForm onSubmit={registerUser} />
            {open && <ResponseAlert data={infos} setOpen={setOpen} />}
        </div>
    )
}

export default SignUp