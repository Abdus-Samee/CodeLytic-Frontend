import { myAxios } from './helper'

export const loadAllCourses = () => {
    return myAxios.get('/course/').then((res) => res.data)
}