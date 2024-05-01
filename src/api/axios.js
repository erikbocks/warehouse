import axios from 'axios'

// user

function checkUser(data) {
    try {
        return axios.post("http://192.168.0.106:8080/auth/login", {
            login: data.login,
            password: data.password
        }).then((response) => {
            return response.data
        }).catch((error) => {
            if (error.code !== "ERR_NETWORK") {
                return error.response
            }
            return { code: error.code, message: error.message }
        })
    } catch (e) {
        console.error(e)
    }
}

function saveUser(data) {
    try {
        return axios.post("http://192.168.0.106:8080/auth/register", {
            username: data.username,
            password: data.password,
            email: data.email
        }).then((response) => {
            return response.data
        }).catch((error) => {
            if (error.code !== "ERR_NETWORK") {
                return error.response
            }
            return { code: error.code, message: error.message }
        })
    } catch (e) {
        console.error(e)
    }
}

function getUser(data, token) {
    try {
        return axios.get(`http://192.168.0.106:8080/api/users/${data}`, { headers: { Authorization: token } })
            .then((response) => {
                return response.data
            }).catch((error) => {
                if (error.code !== "ERR_NETWORK") {
                    return error.response
                }
                return { code: error.code, message: error.message }
            })
    } catch (e) {
        console.error(e)
    }
}

function updateUser(data, token) {
    try {
        return axios.put("http://192.168.0.106:8080/api/users/update", {
            id: data.userId,
            email: data.email,
            username: data.username
        }, { headers: { Authorization: token } }).then((response) => {
            console.log(response)
            return response.data
        }).catch((error) => {
            if (error.code !== "ERR_NETWORK") {
                return error.response
            }
            return { code: error.code, message: error.message }
        })
    } catch (error) {
        console.error(error)
    }
}

function updatePassword(data, token) {
    try {
        return axios.put("http://192.168.0.106:8080/api/users/password", {
            id: data.userId,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, { headers: { Authorization: token } }).then(response => {
            console.log(response)
            return response.data
        }).catch((error) => {
            return error.response
        })
    } catch (e) {
        console.error(e)
    }
}

// products

function getProducts(id, selectedPage, token) {
    try {
        return axios.get(`http://192.168.0.106:8080/api/products/${id}?page=${selectedPage}`, { headers: { Authorization: token } })
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.code !== "ERR_NETWORK") {
                    return error.response
                }
                return { code: error.code, message: error.message }
            })
    } catch (e) {
        console.error(e)
    }
}

function saveProduct(data, token) {
    try {
        return axios.post("http://192.168.0.106:8080/api/products", {
            product: data.product,
            amount: data.amount,
            value: data.value,
            owner: data.owner
        }, { headers: { Authorization: token } }).then((response) => {
            return response.data
        }).catch((error) => {
            if (error.code !== "ERR_NETWORK") {
                return error.response
            }
            return { code: error.code, message: error.message }
        })

    } catch (e) {
        console.error(e)
    }
}

function removeProduct(id, token) {
    try {
        return axios.delete(`http://192.168.0.106:8080/api/products/${id}`, { headers: { Authorization: token } })
            .catch((error) => {
                if (error.code !== "ERR_NETWORK") {
                    return error.response
                }
                return { code: error.code, message: error.message }
            })
    } catch (e) {
        console.error(e)
    }
}

function updateProduct(data, token) {
    try {
        return axios.put("http://192.168.0.106:8080/api/products", {
            id: data.id,
            product: data.product,
            amount: data.amount,
            value: data.value
        }, { headers: { Authorization: token } }).catch((error) => {
            if (error.code !== "ERR_NETWORK") {
                return error.response
            }
            return { code: error.code, message: error.message }
        })
    } catch (error) {
        console.error(error)
    }
}

export { saveUser, checkUser, getUser, updatePassword, getProducts, saveProduct, removeProduct, updateProduct, updateUser }