import { React, useState, useEffect, useReducer } from "react";
import { UserForm } from "../Forms/UserForm";
import { getUser, updatePassword, updateUserData } from "../../api/axios";
import { Link } from "react-router-dom";
import { BaseWhiteBox } from "../BaseWhiteBox";
import { ExpirationModal } from "../ExpirationModal";
import { Title } from "../Title";
import { PasswordModal } from "../PasswordModal";
import { UserModal } from "../UserModal";

function Account() {
    const token = sessionStorage.getItem("authToken")
    const initialStates = {
        user: {
            username: "",
            email: "",
        },
        passwordErrorInfo: {
            status: false,
            message: ""
        },
        userErrorInfo: {
            status: false,
            message: ""
        }
    }

    const [dbUser, setDbUser] = useState(initialStates.user)
    const [userFormData, setUserFormData] = useState(initialStates.user)

    const [state, dispatch] = useReducer(reducer, {
        passwordErrorInfo: initialStates.passwordInfos,
        userErrorInfo: initialStates.userErrorInfo,
        isEditing: false,
        isChangingPassword: false,
        isDisabled: true
    })

    function togglePasswordModal() {
        dispatch({
            type: "togglePasswordModal"
        })
    }

    function toggleIsEditing() {
        dispatch({
            type: "toggleIsEditing"
        })
    }

    function displayFeedback(type, status, message) {
        return dispatch({
            type: type,
            status: status,
            message: message
        })
    }

    function resetUserErrorInfo() {
        dispatch({
            type: "resetUserErrorInfo"
        })
    }

    function resetPasswordAndErrorFields() {
        dispatch({
            type: "resetPasswordAndErrorFields"
        })
    }

    function resetUserFields() {
        dispatch({
            type: "resetUserFields"
        })
    }

    function reducer(state, action) {
        switch (action.type) {
            case "togglePasswordModal":
                return { ...state, isChangingPassword: !state.isChangingPassword };
            case "toggleIsEditing":
                return { ...state, isEditing: !state.isEditing, isDisabled: !state.isDisabled }
            case "updateUserError":
                return { ...state, userErrorInfo: { status: action.status, message: action.message } }
            case "updatePasswordError":
                return { ...state, passwordErrorInfo: { status: action.status, message: action.message } }
            case "resetUserErrorInfo":
                return { ...state, userErrorInfo: initialStates.userErrorInfo }
            case "resetPasswordAndErrorFields":
                return { ...state, passwordErrorInfo: initialStates.passwordErrorInfo }
            case "resetUserFields":
                setUserFormData(initialStates.user)
                return { ...state }
            default:
                return state
        }
    }

    async function saveNewPassword(event, currentPassword, newPassword) {
        event.preventDefault()

        const userInfos = {
            oldPassword: currentPassword,
            newPassword: newPassword
        }

        const updateResponse = await updatePassword(userInfos, token)

        if (updateResponse.status === 400) {
            return displayFeedback("updatePasswordErrorInfo", true, updateResponse.data.messages)
        }

        if (updateResponse.code === "ERR_NETWORK") {
            return displayFeedback("updatePasswordErrorInfo", true, "Recarregue a página ou tente novamente em 30 segundos.")
        }

        togglePasswordModal()
    }

    async function updateUser(event) {
        event.preventDefault()

        const userInfos = {
            username: userFormData.username,
            email: userFormData.email
        }

        const response = await updateUserData(userInfos, token)

        if (response.status === 400) {
            return displayFeedback("updateUserError", true, response.data.messages)
        }

        if (response.code === "ERR_NETWORK") {
            return displayFeedback("updateUserError", true, "Recarregue a página ou tente novamente em 30 segundos.")
        }

        toggleIsEditing();
    }

    useEffect(() => {
        getUser(token).then(res => {
            setDbUser(res.result)
            setUserFormData({
                username: res.result.username,
                email: res.result.email
            })
        })
    }, [token])

    return (
        <div className={'h-full flex flex-col justify-center items-center'}>
            <Title />
            <BaseWhiteBox styleClass={"w-4/5 h-3/5 sm:max-lg:w-1/2 sm:max-lg:h-2/5 xl:w-1/5 xl:h-1/2"}>
                {dbUser?.email && <UserForm userFormData={userFormData} setUserFormData={setUserFormData} resetUserFields={resetUserFields} isEditing={state.isEditing} toggleIsEditing={toggleIsEditing} disabled={state.isDisabled} togglePasswordChange={togglePasswordModal} updateUser={updateUser} />}
                <div className={"w-3/5 h-12 flex justify-evenly items-center"}>
                    <img src={"/list.png"} alt={"Icone de uma lista com marcações"}></img>
                    <Link className={"text-gray-500 underline"} to={"/home"}>Meu armazém</Link>
                </div>
            </BaseWhiteBox>

            {state.isChangingPassword && <PasswordModal {...state.passwordErrorInfo} displayFeedback={displayFeedback} togglePasswordModal={togglePasswordModal} resetPasswordAndErrorFields={resetPasswordAndErrorFields} saveNewPassword={saveNewPassword} />}

            {state.userErrorInfo.status && <UserModal message={state.userErrorInfo.message} resetUserErrorInfo={resetUserErrorInfo} />}

            {!token && <ExpirationModal />}
        </div>

    )
}

export default Account