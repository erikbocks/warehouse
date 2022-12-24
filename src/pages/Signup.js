import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import ResponseAlert from '../components/ResponseAlert'
import { saveUser } from '../api/axios'
import Title from '../components/Title'

function SignUp() {
    const [open, setOpen] = useState(false)
    let [severity, setSeverity] = useState("error")
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde.")

    async function registerUser(data) {
        let save = await saveUser(data)

        if (save === "registered") {
            setSeverity("success")
            setTitle("Concluído")
            setMessage("Sua conta foi criada com sucesso!")
        }

        if (save === "already registered") {
            setSeverity("info")
            setTitle("Ops...")
            setMessage("Credenciais já registradas.")
        }

        setOpen(true)
    }

    let infos = {
        open: open,
        severity: severity,
        title: title,
        message: message
    }

    return (
        <>
            <Title />
            <SignUpForm onSubmit={registerUser} />
            <ResponseAlert data={infos} />
        </>
    )
}

export default SignUp