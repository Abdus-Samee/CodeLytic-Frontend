import { myAxios } from './helper'

export const loadAllCourses = () => {
    return myAxios.get('/course/').then((res) => res.data)
}

export const loadSingleCourse = (courseId) => {
    return myAxios.get(`/course/${courseId}`).then(res => res.data)
}

export const loadAllTags = () => {
    return myAxios.get('/tags').then(res => res.data)
}

export const createCourse = (course) => {
    return myAxios.post('/course', course).then(res => res.data)
}