import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Box, Paper } from "@mui/material"

import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"

import { loadSinglePost, createComment } from "../../services/posts"
import transition from "../../transition"

// import { createComment } from "../../services/comments"

import "../../assets/css/discussion-post.css"

const Post = ({ token }) => {
  // const { post, rootComments, createLocalComment } = usePost()
  const [post, setPost] = useState({})
  const [rootComments, setRootComments] = useState([{}])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    loadSinglePost(id).then((res) => {
      setPost(res)
      setLoading(false)

      if (res?.comments == null) return

      setComments(res.comments)

      const rootComments = res.comments.filter(comment => comment.parentComment == null)
      setRootComments(rootComments)

      // if (res?.comments == null) return
      // setComments(res.comments)
    }).catch(e => console.log(e))
  }, [])

  function onCommentCreate(message) {
    // return createCommentFn({ postId: post.id, message }).then(
    //   createLocalComment
    // )

    const comment = {
      content: message,
      parentCommentId: 0,
      postId: id
    }

    const customHeaders = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }

    createComment(comment, customHeaders).then((res) => {
      createLocalComment(res)
    }).catch(e => console.log(e))
  }

  const createLocalComment = (comment) => {
    setComments(prevComments => {
      return [comment, ...prevComments]
    })

    setRootComments(prevComments => {
      return [comment, ...prevComments]
    })
  }

  return (
    <Container>
      <h1 className="post-title">{post.title}</h1>
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
          },
        }}
      >
        <Paper
          elevation={12}
          sx={{
            background: '#1F1E23',
            color: '#ffffff',
            padding: 1,
            width: '100%'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content}}></div>
        </Paper>
      </Box>
      <h3 className="comments-title">Comments</h3>
      <section>
        {token && <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />}
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </Container>
  )
}

export default transition(Post)