import { InputChangeHandler } from "../utils/InputChangeHandler"

function PasswordInput(props) {

    const { name, type, placeholder, value, autocomplete, passwordFormData, setPasswordFormData } = props

    return (
        <input className={"w-3/4 h-10 p-2 border border-solid rounded-xl bg-slate-200"} name={name} type={type} placeholder={placeholder} value={value} autoComplete={autocomplete} onChange={e => { InputChangeHandler(e, passwordFormData, setPasswordFormData) }} required={true}></input>
    )
}

export default PasswordInput