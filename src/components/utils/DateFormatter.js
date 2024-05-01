export function DateFormatter(date) {

    if (date != null) {
        return new Date(date).toLocaleString("pt-BR")
    }

    return "Nunca"
}