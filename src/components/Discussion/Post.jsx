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
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
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
    </>
  )
}

export default Post