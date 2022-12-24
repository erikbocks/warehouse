import axios from 'axios'

// users

// salva o usuário no banco
async function saveUser(data) {
    try {
        let query = await axios.post("http://localhost:4000/login/save", {
            email: data.email,
            password: data.password,
            user: data.user,
            date: data.date
        })
        return query.data
    } catch (e) {
        console.error(e)
    }
}

// verifica se o usuário existe
async function checkUser(data) {
    try {
        let query = await axios.post("http://localhost:4000/login/check", {

            data: {
                login: data.login,
                password: data.password
            },

            headers: { 'Content-Type': 'application/json' }
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

// atualiza a última data de login do usuário
async function lastLogin(id, date) {
    try {
        let query = await axios.patch("http://localhost:4000/login/update", {
            user_id: id,
            date: date
        })

        return query.data
    } catch (e) {
        console.error(e)
    }
}

// products 

// faz a request nos produtos com o id
async function getProducts(id) {
    try {

        let query = await axios.get(`http://localhost:4000/products/${id}`)

        return query.data
    } catch (e) {
        console.error(e)
    }
}

// salva o produto no banco
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

// remove o produto do banco
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

// atualiza os dados do produto no banco
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

export { saveUser, checkUser, lastLogin, getProducts, saveProduct, removeProduct, updateProduct }