import { React, useState, useEffect, useReducer } from "react";
import { UserForm } from "../Forms/UserForm";
import { getUser, updatePassword, updateUser } from "../../api/axios";
import Title from "../Title";
import PasswordModal from "../PasswordModal";
import { Link } from "react-router-dom";
import { BaseWhiteBox } from "../BaseWhiteBox";
import { ExpirationModal } from "../ExpirationModal";
import { BaseWhiteBoxOverlay } from "../BaseWhiteBoxOverlay";

function Account() {
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("authToken")
    const [dbUser, setDbUser] = useState({})

    const initials = {
        password: {
            currentPassword: "",
            firstNewPassword: "",
            secondNewPassword: ""
        },
        user: {
            username: dbUser.username,
            email: dbUser.email,
        }

    }
    const [passwordFormData, setPasswordFormData] = useState(initials.password)
    const [userFormData, setUserFormData] = useState(initials.user)

    const [state, dispatch] = useReducer(reducer, {
        passwordErrorStatus: false,
        userErrorStatus: false,
        errorMessage: "",
        isEditing: false,
        changingPassword: false,
        disabled: true
    })

    function togglePasswordChange() {
        dispatch({
            type: "togglePasswordChange"
        })
    }

    function toggleEditing() {
        dispatch({
            type: "toggleEditing"
        })
    }

    function cancelEditing() {
        dispatch({
            type: "disableEditing"
        })
    }

    function cleanPasswordAndError() {
        dispatch({
            type: "resetPassAndError"
        })
    }

    function cleanErrorFeedback() {
        dispatch({
            type: "resetError"
        })
    }

    function cleanUser() {
        dispatch({
            type: "resetUser"
        })
    }

    function displayFeedback(type, status, message) {
        return dispatch({
            type: type,
            status: status,
            message: message
        })
    }

    function checkPasswords(firstPassword, secondPassword) {
        let status = firstPassword !== secondPassword
        let message = status ? "As senhas não coincidem." : ""

        displayFeedback("changePasswordFeedback", status, message)
    }

    function reducer(state, action) {
        switch (action.type) {
            case "togglePasswordChange":
                return { ...state, changingPassword: !state.changingPassword };
            case "toggleEditing":
                return { ...state, isEditing: !state.isEditing, disabled: !state.disabled }
            case "storeDatabaseUser":
                setDbUser(action.user)
                return {...state}
            case "changePasswordFeedback":
                return { ...state, passwordErrorStatus: action.status, errorMessage: action.message }
            case "changeUserFeedback":
                return { ...state, userErrorStatus: action.status, errorMessage: action.message }
            case "resetPassAndError":
                setPasswordFormData(initials.password)
                return { ...state, errorStatus: false, errorMessage: "" }
            case "resetUser":
                setUserFormData(initials.user)
                return {...state}
            case "resetError":
                return { ...state, userErrorStatus: false, errorMessage: "" }
            default:
                return state
        }
    }

    async function saveNewPassword(e) {
        e.preventDefault()

        let userInfos = {
            userId: userId,
            oldPassword: passwordFormData.currentPassword,
            newPassword: passwordFormData.firstNewPassword
        }

        let response = await updatePassword(userInfos, token)

        if (response.status === 400) {
            displayFeedback("changePasswordFeedback", true, response.data.messages)
            return
        }

        if (response.code === "ERR_NETWORK") {
            displayFeedback("changePasswordFeedback", true, "Recarregue a página ou tente novamente em 30 segundos.")
            return
        }

        cleanPasswordAndError()

        togglePasswordChange()
    }

    async function update(e) {
        e.preventDefault()

        let userInfos = {
            userId: userId,
            username: userFormData.username,
            email: userFormData.email
        }

        let response = await updateUser(userInfos, token)

        if (response.status === 400) {
            displayFeedback("changeUserFeedback", true, response.data.messages)
            return
        }

        if (response.code === "ERR_NETWORK") {
            displayFeedback("changeUserFeedback", true, "Recarregue a página ou tente novamente em 30 segundos.")
            return
        }

        toggleEditing();
    }

    useEffect(() => {
        getUser(userId, token).then(res => {
            setDbUser(res.result)
            setUserFormData({
                username: res.result.username,
                email: res.result.email
            })
        })
    }, [userId, token])

    useEffect(() => {
        checkPasswords(passwordFormData.firstNewPassword, passwordFormData.secondNewPassword)
        //eslint-disable-next-line
    }, [passwordFormData])

    console.log(state)

    return (
        <div className={'h-full flex flex-col justify-center items-center'}>
            <Title />
            <BaseWhiteBox styleClass={"w-4/5 h-3/5 sm:max-lg:w-1/2 sm:max-lg:h-2/5 xl:w-1/5 xl:h-1/2"}>
                {dbUser?.id && <UserForm userFormData={userFormData} setUserFormData={setUserFormData} cleanup={cleanUser} isEditing={state.isEditing} toggleEditing={toggleEditing} cancelEditing={cancelEditing} disabled={state.disabled} togglePasswordChange={togglePasswordChange} update={update} />}
                <div className={"w-3/5 h-12 flex justify-evenly items-center"}>
                    <img src={"/list.png"} alt={"Icone de uma lista com marcações"}></img>
                    <Link className={"text-gray-500 underline"} to={"/home"}>Meu armazém</Link>
                </div>
            </BaseWhiteBox>
            {state.changingPassword && <PasswordModal passwordFormData={passwordFormData} errorStatus={state.passwordErrorStatus} errorMessage={state.errorMessage} setPasswordFormData={setPasswordFormData} cleanup={cleanPasswordAndError} togglePasswordChange={togglePasswordChange} saveNewPassword={saveNewPassword} />}
            {state.userErrorStatus && <BaseWhiteBoxOverlay styleClass={"flex flex-col items-center justify-evenly w-3/5 h-1/5 sm:max-lg:w-1/3 sm:max-lg:h-1/6 xl:w-1/6 xl:h-1/6"}>
                <p className={"w-5/6 text-center"}>{state.errorMessage}</p>
                <button onClick={cleanErrorFeedback} className={"h-10 w-24 rounded-full bg-sky-600 text-white"}>Fechar</button>
            </BaseWhiteBoxOverlay>}
            {!userId && <ExpirationModal />}
        </div>

    )
}

export default Account