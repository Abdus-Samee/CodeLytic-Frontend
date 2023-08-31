import { myAxios } from './helper'

export const loadAllPosts = () => {
    return myAxios.get('/post').then(res => res.data)
}

export const loadSinglePost = (id) => {
    return myAxios.get(`/post/${id}`).then(res => res.data)
}

export const createPost = (post, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.post('/post', post, config).then(res => res.data)
}

export const createComment = (comment, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.post('/comment', comment, config).then(res => res.data)
}

export const updateComment = (commentId, comment, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    // console.log('Update comment', comment)
    return myAxios.put(`/comment/${commentId}`, comment, config).then(res => res.data)
}

export const deleteComment = (commentId, headers) => {
    const config = {
        headers: {
            ...myAxios.defaults.headers,
            ...headers,
        },
    }

    return myAxios.delete(`/comment/${commentId}`, config, headers).then(res => res.data)
}