export function InputChangeHandler(event, formData, setter) {
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    setter({
        ...formData,
        [fieldName]: fieldValue
    })
}