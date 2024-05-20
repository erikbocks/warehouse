import { React, useState, useEffect, useReducer } from "react";
import { UserForm } from "../Forms/UserForm";
import { deleteUser, getUser, updatePassword, updateUserData } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { BaseWhiteBox } from "../BaseWhiteBox";
import { ExpirationModal } from "../ExpirationModal";
import { Title } from "../Title";
import { PasswordModal } from "../PasswordModal";
import { UserModal } from "../UserModal";
import { ConfirmationAlert } from "../ConfirmationAlert";
import { InformationModal } from "../../InformationModal";

function Account() {
    const token = sessionStorage.getItem("authToken")
    const pageNavigator = useNavigate();
    const initialStates = {
        user: {
            username: "",
            email: "",
        },
        passwordModalInfo: {
            isOpen: false,
            message: ""
        },
        userModalInfo: {
            isOpen: false,
            message: ""
        }
    }

    const [dbUser, setDbUser] = useState(initialStates.user)
    const [userFormData, setUserFormData] = useState(initialStates.user)

    const [state, dispatch] = useReducer(reducer, {
        passwordModalInfo: initialStates.passwordInfos,
        userModalInfo: initialStates.userModalInfo,
        isEditing: false,
        isChangingPassword: false,
        isDisabled: true,
        isRemovingUser: false,
        wasUserDeleted: false,
        wasPasswordChanged: false,
        wasUserChanged: false
    })

    function togglePasswordModal() {
        dispatch({
            type: "togglePasswordModal"
        })
    }

    function toggleIsRemovingUser() {
        dispatch({
            type: "toggleIsRemovingUser"
        })
    }

    function toggleIsEditing() {
        dispatch({
            type: "toggleIsEditing"
        })
    }

    function toggleWasUserDeleted() {
        dispatch({
            type: "toggleWasUserDeleted"
        })
    }

    function toggleWasPasswordChanged() {
        dispatch({
            type: "toggleWasPasswordChanged"
        })
    }

    function toggleWasUserChanged() {
        dispatch({
            type: "toggleWasUserChanged"
        })
    }

    function displayFeedback(type, isOpen, message) {
        return dispatch({
            type: type,
            isOpen: isOpen,
            message: message
        })
    }

    function resetUserModalInfo() {
        dispatch({
            type: "resetUserModalInfo"
        })
    }

    function resetPasswordAndModalFields() {
        dispatch({
            type: "resetPasswordAndModalFields"
        })
    }

    function resetUserFormFields() {
        dispatch({
            type: "resetUserFormFields"
        })
    }

    function closeModalAndDisableUserEditing() {
        toggleWasUserChanged()
        toggleIsEditing()
    }

    function closeAndResetPasswordModal() {
        resetPasswordAndModalFields()
        toggleWasPasswordChanged()
        togglePasswordModal()
    }

    function redirectUserAndDeleteToken() {
        resetUserModalInfo()
        sessionStorage.removeItem("authToken")
        pageNavigator("/")
    }

    function reducer(state, action) {
        switch (action.type) {
            case "togglePasswordModal":
                return { ...state, isChangingPassword: !state.isChangingPassword };
            case "toggleWasPasswordChanged":
                return { ...state, wasPasswordChanged: !state.wasPasswordChanged }
            case "toggleIsEditing":
                return { ...state, isEditing: !state.isEditing, isDisabled: !state.isDisabled }
            case "toggleWasUserChanged":
                return { ...state, wasUserChanged: !state.wasUserChanged }
            case "toggleIsRemovingUser":
                return { ...state, isRemovingUser: !state.isRemovingUser }
            case "toggleWasUserDeleted":
                return { ...state, wasUserDeleted: !state.wasUserDeleted }
            case "updateUserModalInfo":
                return { ...state, userModalInfo: { isOpen: action.isOpen, message: action.message } }
            case "updatePasswordModalInfo":
                return { ...state, passwordModalInfo: { isOpen: action.isOpen, message: action.message } }
            case "resetUserModalInfo":
                return { ...state, userModalInfo: initialStates.userModalInfo }
            case "resetPasswordAndModalFields":
                return { ...state, passwordModalInfo: initialStates.passwordModalInfo }
            case "resetUserFormFields":
                setUserFormData({ ...dbUser })
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
            return displayFeedback("updatePasswordModalInfo", true, updateResponse.data.messages)
        }

        if (updateResponse.code === "ERR_NETWORK") {
            return displayFeedback("updatePasswordModalInfo", true, "Recarregue a página ou tente novamente em 30 segundos.")
        }

        toggleWasPasswordChanged()
    }

    async function updateUser(event) {
        event.preventDefault()

        const userInfos = {
            username: userFormData.username,
            email: userFormData.email
        }

        const response = await updateUserData(userInfos, token)

        if (response.status === 400) {
            return displayFeedback("updateUserModalInfo", true, response.data.messages)
        }

        if (response.code === "ERR_NETWORK") {
            return displayFeedback("updateUserModalInfo", true, "Recarregue a página ou tente novamente em 30 segundos.")
        }

        toggleWasUserChanged();
    }

    async function removeUser() {
        const response = await deleteUser(token)

        if (response.status === 400) {
            return displayFeedback("updateUserModalInfo", true, response.data.messages)
        }

        if (response.code === "ERR_NETWORK") {
            return displayFeedback("updateUserModalInfo", true, "Recarregue a página ou tente novamente em 30 segundos.")
        }

        toggleWasUserDeleted()
    }

    useEffect(() => {
        getUser(token).then(res => {
            if (res.status === 401 || res.status === 403) {
                sessionStorage.removeItem("authToken")
            }

            const { username, email } = res.result
            setDbUser({
                username: username,
                email: email
            })
            setUserFormData({
                username: username,
                email: email
            })
        })
    }, [token])

    return (
        <div className={'h-full flex flex-col justify-center items-center'}>
            <Title />
            <BaseWhiteBox styleClass={"w-4/5 h-3/5 sm:max-lg:w-1/2 sm:max-lg:h-2/5 xl:w-1/5 xl:h-1/2"}>
                {dbUser?.email && <UserForm userFormData={userFormData} setUserFormData={setUserFormData} disabled={state.isDisabled} resetUserFormFields={resetUserFormFields} isEditing={state.isEditing} toggleIsEditing={toggleIsEditing} togglePasswordChange={togglePasswordModal} toggleIsRemovingUser={toggleIsRemovingUser} updateUser={updateUser} />}
                <div className={"w-3/5 h-12 flex justify-evenly items-center"}>
                    <img src={"/list.png"} alt={"Icone de uma lista com marcações"}></img>
                    <Link className={"text-gray-500 underline"} to={"/home"}>Meu armazém</Link>
                </div>
            </BaseWhiteBox>

            {state.isChangingPassword && <PasswordModal {...state.passwordModalInfo} displayFeedback={displayFeedback} togglePasswordModal={togglePasswordModal} resetPasswordAndModalFields={resetPasswordAndModalFields} saveNewPassword={saveNewPassword} />}

            {state.userModalInfo.isOpen && <UserModal message={state.userModalInfo.message} resetUserModalInfo={resetUserModalInfo} />}

            {state.wasUserChanged && <InformationModal message={"Usuário atualizado com sucesso!"} buttonFunction={closeModalAndDisableUserEditing} />}

            {state.wasPasswordChanged && <InformationModal message={"Senha alterada com sucesso!"} buttonFunction={closeAndResetPasswordModal} />}

            {state.wasUserDeleted && <InformationModal message={"Usuário removido com sucesso!"} buttonFunction={redirectUserAndDeleteToken} />}

            {state.isRemovingUser && <ConfirmationAlert closeFunction={toggleIsRemovingUser} confirmationFunction={removeUser} />}

            {!token && <ExpirationModal />}
        </div>
    )
}

export default Account