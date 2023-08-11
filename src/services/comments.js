// import { makeRequest } from "./makeRequest"
import { useState, useMemo } from "react"

const [comments, setComments] = useState([])

const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach(comment => {
        group[comment.parentId] ||= []
        group[comment.parentId].push(comment)
    })
    return group
}, [comments])

export function createComment({ postId, message, parentId }) {
    // setComments(prevComments => {
    //     return [message, ...prevComments]
    // })

    return makeRequest(`posts/${postId}/comments`, {
        method: "POST",
        data: { message, parentId },
    })
}

export function updateComment({ postId, message, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function deleteComment({ postId, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
  })
}