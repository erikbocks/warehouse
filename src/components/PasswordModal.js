import { React } from "react"
import PasswordInput from "./Inputs/PasswordInput"
import { BaseWhiteBoxOverlay } from "./BaseWhiteBoxOverlay"

function PasswordModal(props) {
    const { passwordFormData, setPasswordFormData, cleanup, errorStatus, errorMessage, checkPasswords, togglePasswordChange, saveNewPassword } = props

    const inputs = [
        {
            id: 1,
            name: "currentPassword",
            type: "password",
            placeholder: "Senha atual",
            autocomplete: "current-password",
            value: passwordFormData.currentPassword
        },
        {
            id: 2,
            name: "firstNewPassword",
            type: "password",
            placeholder: "Nova senha",
            autocomplete: "new-password",
            value: passwordFormData.firstNewPassword
        },
        {
            id: 3,
            name: "secondNewPassword",
            type: "password",
            placeholder: "Redigite a nova senha",
            autocomplete: "new-password",
            value: passwordFormData.secondNewPassword
        }
    ]

    return (
        <BaseWhiteBoxOverlay styleClass={"flex flex-col justify-evenly w-3/4 h-1/2 sm:max-lg:w-1/2 sm:max-lg:h-1/3 xl:w-1/6 xl:h-2/5"}>
            <div className={"w-full h-1/2 flex flex-col justify-evenly items-center "}>
                {inputs.map(input => {
                    return <PasswordInput key={input.id} {...input} passwordFormData={passwordFormData} setPasswordFormData={setPasswordFormData} checkPasswords={checkPasswords} />
                })}
            </div>
            {errorStatus && <div className={"flex justify-center"}>
                <p className={"w-5/6 text-center text-red-500 text-sm"}>{errorMessage}</p>
            </div>}
            <div className={"w-4/5 h-auto flex justify-between items-center"}>
                <button onClick={(e) => { togglePasswordChange(); cleanup() }} className={"w-28 h-10 rounded-xl text-white bg-gray-500"}>
                    Cancelar
                </button>
                <button className={"w-28 h-10 rounded-xl text-white bg-green-600 disabled:bg-zinc-400"} disabled={errorStatus} onClick={saveNewPassword}>
                    Salvar
                </button>
            </div>
        </BaseWhiteBoxOverlay>
    )
}

export default PasswordModal