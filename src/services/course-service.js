import { myAxios } from './helper'

export const loadAllCourses = async () => {
    const res = await myAxios.get('/course/')
    return res.data
}