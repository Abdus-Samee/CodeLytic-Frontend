// import { makeRequest } from "./makeRequest"
import { useState, useMemo } from "react"

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

export function deleteComment(commentId) {
  return makeRequest(`comment/${commentId}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
  })
}