import axios from 'axios'

async function saveUser(data) {
    try {
        let query = await axios.post("http://localhost:3000/api/users", {
            username: data.username,
            password: data.password,
            email: data.email
        })

        return query
    } catch (e) {
        console.error(e)
    }
}

async function checkUser(data) {
    try {
        let query = await axios.post("http://localhost:8080/api/users/verify", {
            login: data.login,
            password: data.password
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function getProducts(id) {
    try {

        let query = await axios.get(`http://localhost:4000/products/${id}`)

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function saveProduct(data) {
    try {
        let query = await axios.post("http://localhost:4000/products/save", {
            item_id: data.item_id,
            item: data.item,
            amount: data.amount,
            added_on: data.added_on,
            last_edit: data.last_edit,
            owner_id: data.owner_id
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function removeProduct(data) {
    try {
        let query = await axios.post("http://localhost:4000/products/remove", {
            item_id: data
        })

        return query
    } catch (e) {
        console.error(e)
    }
}

async function updateProduct(data) {
    try {
        let query = await axios.patch("http://localhost:4000/products/update", {
            product: data.product,
            amount: data.amount,
            last_edit: data.last_edit,
            item_id: data.item_id
        })

        return query
    } catch (error) {
        console.error(error)
    }
}

export { saveUser, checkUser, getProducts, saveProduct, removeProduct, updateProduct }