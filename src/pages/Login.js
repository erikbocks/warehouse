import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser, lastLogin } from '../api/axios';
import LoginForm from '../components/LoginForm';
import ResponseAlert from '../components/ResponseAlert';
import Title from '../components/Title';

function Login() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    let [severity, setSeverity] = useState("error")
    let [title, setTitle] = useState("Erro")
    let [message, setMessage] = useState("Ocorreu um erro. Tente novamente mais tarde.")

    async function checkLogin(data) {
        let query = await checkUser(data)

        if (query === undefined) {
            return setOpen(true)
        }

        if (query.length === 0) {
            setSeverity("info")
            setTitle("Ops...")
            setMessage("Email ou Senha incorretos.")
            setOpen(true)
            return
        }

        if (query.length >= 1) {
            setSeverity("success")
            setTitle("Autenticado!")
            setMessage("Você vai ser redirecionado em alguns segundos")
        }

        setOpen(true)

        return query
    }

    async function redirect(data) {
        let check = await checkLogin(data)

        if (check !== undefined) {
            const date = new Date().toLocaleString()

            sessionStorage.setItem('userId', JSON.stringify(check.user_id))
            lastLogin(check.user_id, date)

            navigate('/home')
        }
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
            <LoginForm onSubmit={redirect} />
            <ResponseAlert data={infos} />
        </>
    )
}

export default Login