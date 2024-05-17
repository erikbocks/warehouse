import { React } from 'react'
import UserFormInput from '../Inputs/UserFormInput'

export function UserForm(props) {
    const { userFormData, setUserFormData, resetUserFields, isEditing, toggleIsEditing, disabled, togglePasswordChange, updateUser } = props

    const inputs = [
        {
            id: 1,
            title: "Usuário",
            type: "text",
            name: "username",
            disabled: disabled,
            autocomplete: "username",
            value: userFormData.username
        },
        {
            id: 2,
            title: "Email",
            type: "text",
            name: "email",
            disabled: disabled,
            autocomplete: "email",
            value: userFormData.email
        }
    ]

    return (
        <div className={"w-full h-5/6 flex flex-col justify-evenly items-center "}>
            <form className={"w-full h-1/2 flex flex-col justify-around items-center"}>
                {inputs.map(input => {
                    return <UserFormInput key={input.id} {...input} formData={userFormData} setFormData={setUserFormData} />
                })}
            </form>
            <div className={"w-full h-1/2 flex flex-col justify-evenly items-center"}>
                {!isEditing && <button onClick={togglePasswordChange} className={"bg-sky-600 w-3/5 h-10 text-white rounded-full"}>
                    Mudar senha
                </button>}

                {!isEditing && <button onClick={toggleIsEditing} className={"bg-sky-600 w-3/5 h-10 text-white rounded-full"}>
                    Editar
                </button>}

                {isEditing && <button className={"bg-green-600 w-3/5 h-10 text-white rounded-full"} onClick={(e) => updateUser(e)}>
                    Salvar
                </button>}

                {isEditing && <button onClick={(e) => { toggleIsEditing(); resetUserFields() }} className={"bg-zinc-600 w-3/5 h-10 text-white rounded-full"}>
                    Cancelar
                </button>}

                {!isEditing && <button className={"bg-red-600 w-3/5 h-10 text-white rounded-full"}>
                    Excluir
                </button>}
            </div>
        </div >
    )
}