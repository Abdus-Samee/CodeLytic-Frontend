import { myAxios } from './helper'

export const authenticateUser = (user) => {
    return myAxios.post('/authenticate', user).then(res => res.data)
}