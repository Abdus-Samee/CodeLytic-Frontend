import { Container, Box, Paper } from "@mui/material"

import { usePost } from "../../contexts/PostContext"
import { useAsyncFn } from "../../hooks/useAsync"
// import { createComment } from "../../services/comments"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"

import "../../assets/css/discussion-post.css"

const Post = () => {
  const { post, rootComments, createLocalComment } = usePost()

  const loading = false
  const error = false

  function onCommentCreate(message) {
    // return createCommentFn({ postId: post.id, message }).then(
    //   createLocalComment
    // )

    const comment = { id: 1, message, user: { id: 1, name: "Test User" }, createdAt: new Date(), likeCount: 0, likedByMe: false, parentId: null }
    createLocalComment(comment)
  }

  return (
    <Container>
      <h1 class="post-title">{post.title}</h1>
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
          <div dangerouslySetInnerHTML={{ __html: post.body}}></div>
        </Paper>
      </Box>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </Container>
  )
}

export default Post