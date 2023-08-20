import { IconBtn } from "./IconBtn"
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from "../../contexts/PostContext"
import { CommentList } from "./CommentList"
import { useState } from "react"
// import { useAsyncFn } from "../../hooks/useAsync"
// import {
//   createComment,
//   deleteComment,
//   toggleCommentLike,
//   updateComment,
// } from "../../services/comments"
import { CommentForm } from "./CommentForm"

import { updateComment } from "../../services/posts"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export function Comment({
  id,
  content,
  parentComment,
  childComments
}) {
  const [commentContent, setCommentContent] = useState(content)
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const token = localStorage.getItem('codelytic-token')

  // const {
  //   post,
  //   getReplies,
  //   createLocalComment,
  //   updateLocalComment,
  //   deleteLocalComment,
  //   toggleLocalCommentLike,
  // } = usePost()

//   const createCommentFn = useAsyncFn(createComment)
//   const updateCommentFn = useAsyncFn(updateComment)
//   const deleteCommentFn = useAsyncFn(deleteComment)
//   const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
  // const childComments = getReplies(id)
  const currentUser = { id: 1, name: "Test User" }

//   function onCommentReply(message) {
//     return createCommentFn
//       .execute({ postId: post.id, message, parentId: id })
//       .then(comment => {
//         setIsReplying(false)
//         createLocalComment(comment)
//       })
//   }

  const onCommentReply = (message) => {
    setIsReplying(false)
    createLocalComment({ id: id+1, message, user: { id: 1, name: "Test User" }, createdAt: new Date(), likeCount: 0, likedByMe: false, parentId: id })
  }

//   function onCommentUpdate(message) {
//     return updateCommentFn
//       .execute({ postId: post.id, message, id })
//       .then(comment => {
//         setIsEditing(false)
//         updateLocalComment(id, comment.message)
//       })
//   }

  const onCommentUpdate = (message) => {
    const headers = {
      Authorization: 'Bearer ' + token,
    }

    updateComment(id, message, headers).then((res) => {
      setIsEditing(false)
      setCommentContent(message)
    }).catch(e => console.log(e))
  }

//   function onCommentDelete() {
//     return deleteCommentFn
//       .execute({ postId: post.id, id })
//       .then(comment => deleteLocalComment(comment.id))
//   }

  const onCommentDelete = () => {
    deleteLocalComment(id)
  }

//   function onToggleCommentLike() {
//     return toggleCommentLikeFn
//       .execute({ id, postId: post.id })
//       .then(({ addLike }) => toggleLocalCommentLike(id, addLike))
//   }

  const onToggleCommentLike = () => {
    toggleLocalCommentLike(id, !likedByMe)
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          {/**<span className="name">{user.name}</span>**/}
          <span className="date">
            {/**dateFormatter.format(Date.parse(createdAt))**/}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={commentContent}
            onSubmit={onCommentUpdate}
            loading={false}
            // error={updateCommentFn.error}
            error={false}
          />
        ) : (
          <div className="message">{commentContent}</div>
        )}
        <div className="footer">
          {/**<IconBtn
            onClick={onToggleCommentLike}
            // disabled={toggleCommentLikeFn.loading}
            disabled={false}
            // Icon={likedByMe ? FaHeart : FaRegHeart}
            // aria-label={likedByMe ? "Unlike" : "Like"}
        />**/}
          <IconBtn
            onClick={() => setIsReplying(prev => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {currentUser.id === 1 && (
            <>
              <IconBtn
                onClick={() => setIsEditing(prev => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                // disabled={deleteCommentFn.loading}
                disabled={false}
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={false}
            error={false}
          />
        </div>
      )}
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
        </>
      )}
    </>
  )
}