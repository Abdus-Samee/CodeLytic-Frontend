import { myAxios } from './helper'

export const authenticateUser = (user) => {
    return myAxios.post('/authenticate', user).then(res => res.data)
}

export const registerUser = (user) => {
    return myAxios.post('/user/register', user).then(res => res.data)
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

export const getTotalComments = (headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get('/user/comments', config).then(res => res.data)
}

export const getCourseProgress = (courseId, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get(`/progress/${courseId}`, config).then(res => res.data)
}

export const getProgressPercentage = (headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get(`/progress/percentage`, config).then(res => res.data)
}