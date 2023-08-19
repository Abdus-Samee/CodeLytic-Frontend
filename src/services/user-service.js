import { myAxios } from './helper'

export const authenticateUser = (user) => {
    return myAxios.post('/authenticate', user).then(res => res.data)
}

export const getUser = (headers) => {
    // console.log("headers: ", headers)

    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get('/user/', config).then(res => res.data)
}