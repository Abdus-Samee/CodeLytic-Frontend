import { myAxios } from './helper'

export const loadAllCourses = () => {
    return myAxios.get('/course/').then((res) => res.data)
}

export const loadSingleCourse = (courseId) => {
    return myAxios.get(`/course/${courseId}`).then(res => res.data)
}

export const loadCourseByAuthor = (headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }
    
    return myAxios.get('/course/by-author', config).then(res => res.data)
}

export const loadAllTags = (headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get('/tags', config).then(res => res.data)
}

export const createCourse = (course, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.post('/course', course, config).then(res => res.data)
}

export const createSubsection = (courseId, subsection, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    console.log("Getting subsection:", subsection)

    return myAxios.post(`/course/subsection/${courseId}`, subsection, config).then(res => res.data)
}

export const createLecture = (lecture, sid, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    // console.log(lecture)

    return myAxios.post(`/course/lecture/${sid}`, lecture, config).then(res => res.data)
}

export const loadSingleLecture = (lectureId) => {
    return myAxios.get(`/course/lecture/${lectureId}`).then(res => res.data)
}

export const loadQuiz = (quizId, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.get(`/course/quiz/${quizId}`, config).then(res => res.data)
}

export const createQuiz = (quiz, sid, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    // console.log(quiz)

    return myAxios.post(`/course/quiz/${sid}`, quiz, config).then(res => res.data)
}

export const enrollCourse = (courseId, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.post(`/course/${courseId}/enroll`, {}, config).then(res => res.data)
}

export const completeLecture = (courseId, subsectionId, lectureId, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.post(`/course/${courseId}/complete/${subsectionId}/lecture/${lectureId}`, {}, config).then(res => res.data)
}