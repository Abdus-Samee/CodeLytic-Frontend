import { myAxios } from './helper'

export const authenticateUser = (user) => {
    return myAxios.post('/authenticate', user).then(res => res.data)
}

export const getUser = () => {
    return myAxios.get('/user/').then(res => res.data)
}