import axios from 'axios'

async function saveUser(data) {
    try {
        let query = await axios.post("http://localhost:8080/api/users", {
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
        let query = await axios.post("http://192.168.0.106:8080/api/users/find", {
            login: data.login,
            password: data.password
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function checkRegistry(data) {
    try {
        let query = await axios.post("http://192.168.0.106:8080/api/users/check", {
            email: data.email,
            username: data.username
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function getProducts(id, selectedPage) {
    try {
        let query = await axios.get(`http://192.168.0.106:8080/api/products/${id}?page=${selectedPage}`)

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function saveProduct(data) {
    try {

        let query = await axios.post("http://localhost:8080/api/products", {
            product: data.product,
            amount: data.amount,
            value: data.value,
            owner: data.owner
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

async function removeProduct(id) {
    try {

        let query = await axios.delete(`http://localhost:8080/api/products/${id}`)

        return query
    } catch (e) {
        console.error(e)
    }
}

async function updateProduct(data) {
    try {
        let query = await axios.put("http://localhost:8080/api/products", {
            id: data.id,
            product: data.product,
            amount: data.amount,
            value: data.value
        })

        return query
    } catch (error) {
        console.error(error)
    }
}

export { saveUser, checkUser, checkRegistry, getProducts, saveProduct, removeProduct, updateProduct }