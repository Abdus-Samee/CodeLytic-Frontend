import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { loadAllPosts, loadSinglePost } from "../services/posts"
import { CircularProgress } from "@mui/material"

const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { id } = useParams()
  // const posts = [
  //   {id: 1, title: "Post 1", body: "This is the body of post 1", tags: ["tag1", "tag2"]},
  //   {id: 2, title: "Post 2", body: "<h1>This is the body of post 2</h1><br/>This is the heading<br/>This is the subheading<br/>More text", tags: ["tag1", "tag2"]},
  //   {id: 3, title: "Post 3", body: "This is the body of post 3", tags: ["tag1", "tag2"]},
  //   {id: 4, title: "Post 4", body: "This is the body of post 4", tags: ["tag1", "tag2"]},
  //   {id: 5, title: "Post 5", body: "This is the body of post 5", tags: ["tag1", "tag2"]},
  // ]
  
  // const { loading, error, value: post } = useAsync(() => loadSinglePost(id), [id])
  // const post = posts.find(post => post.id == id)
  // const loading = false
  // const error = false

  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach(comment => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })

    console.log(group)
    return group
  }, [comments])

  useEffect(() => {
    loadSinglePost(id).then((res) => {
      setPost(res)
      setLoading(false)

      if (res?.comments == null) return
      setComments(res.comments)
    }).catch(e => console.log(e))
  }, [post?.comments])

  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment) {
    setComments(prevComments => {
      return [comment, ...prevComments]
    })
  }

  function updateLocalComment(id, message) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, message }
        } else {
          return comment
        }
      })
    })
  }

  function deleteLocalComment(id) {
    setComments(prevComments => {
      return prevComments.filter(comment => comment.id !== id)
    })
  }

  function toggleLocalCommentLike(id, addLike) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likeCount: comment.likeCount + 1,
              likedByMe: true,
            }
          } else {
            return {
              ...comment,
              likeCount: comment.likeCount - 1,
              likedByMe: false,
            }
          }
        } else {
          return comment
        }
      })
    })
  }

  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}
    >
      {loading ? (
        <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '20%', }} />
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}