import axios from 'axios'

const requestUrl = process.env.REACT_APP_BASE_URL;

function authenticateUser(data) {
    try {
        return axios.post(`${requestUrl}/api/auth/login`, {
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
        return axios.post(`${requestUrl}/api/auth/register`, {
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

function getUser(token) {
    try {
        return axios.get(`${requestUrl}/api/users/find`, { headers: { Authorization: token } })
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

function updateUserData(data, token) {
    try {
        return axios.put(`${requestUrl}/api/users/update`, {
            id: data.userId,
            email: data.email,
            username: data.username
        }, { headers: { Authorization: token } }).then((response) => {
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
        return axios.put(`${requestUrl}/api/users/update-password`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, { headers: { Authorization: token } }).then(response => {
            return response.data
        }).catch((error) => {
            return error.response
        })
    } catch (e) {
        console.error(e)
    }
}

function deleteUser(token) {
    try {
        return axios.delete(`${requestUrl}/api/users`, { headers: { Authorization: token } }).then((response) => {
            return response.data
        }).catch((error) => {
            return error.response
        })
    } catch (e) {
        console.error(e)
    }
}

// products

function getProducts(selectedPage, token) {
    try {
        return axios.get(`${requestUrl}/api/products?page=${selectedPage}`, { headers: { Authorization: token } })
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
        return axios.post(`${requestUrl}/api/products`, {
            productName: data.productName,
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
        return axios.delete(`${requestUrl}/api/products/${id}`, { headers: { Authorization: token } })
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
        return axios.put(`${requestUrl}/api/products`, {
            id: data.id,
            productName: data.productName,
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

export { saveUser, authenticateUser, getUser, updatePassword, deleteUser, getProducts, saveProduct, removeProduct, updateProduct, updateUserData }