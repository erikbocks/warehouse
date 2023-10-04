import { React, useState } from 'react'
import { checkRegistry, saveUser } from '../api/axios'
import SignUpForm from '../components/Forms/SignUpForm'
import ResponseAlert from '../components/ResponseAlert'
import Title from '../components/Title'

function SignUp() {
    const [open, setOpen] = useState(false)
    let [image, setImage] = useState({
        imageSrc: "/error.png",
        imageAlt: "imagem de um sinal de erro"
    })
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde")

    async function registerUser(data) {

        let check = await checkRegistry(data)

        if (check === undefined) {
            setImage({
                imageSrc: "/error.png",
                imageAlt: "imagem de um sinal de erro"
            })
            setTitle("Erro")
            setMessage("Ocorreu um erro. Tente novamente mais tarde.")
            setOpen(true)
            return
        }

        if (check.messages.length > 0) {
            setTitle("Dados incorretos.")
            setMessage(check.messages)
            setImage({ imageSrc: "/warning.png", imageAlt: "imagem de um triangulo com exclamação" })
            setOpen(true)
            return
        }

        setTitle("Concluído")
        setMessage("Sua conta foi criada com sucesso!")
        setImage({
            imageSrc: "/correct.png",
            imageAlt: "imagem de círculo com simbolo de correto"
        })
        setOpen(true)

        await saveUser(data)
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