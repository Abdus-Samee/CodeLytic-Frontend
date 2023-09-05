import { IconBtn } from "./IconBtn"
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { CommentList } from "./CommentList"
import { useState, useEffect } from "react"

import { CommentForm } from "./CommentForm"

import { createComment, updateComment, deleteComment } from "../../services/posts"

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

export function Comment({
  id,
  content,
  author,
  parentComment,
  childComments,
  postId
}) {
  const [commentContent, setCommentContent] = useState(content)
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const token = localStorage.getItem('codelytic-token')
  const currentUser = JSON.parse(localStorage.getItem('codelytic-user'))
  const navigate = useNavigate()

//   function onCommentReply(message) {
//     return createCommentFn
//       .execute({ postId: post.id, message, parentId: id })
//       .then(comment => {
//         setIsReplying(false)
//         createLocalComment(comment)
//       })
//   }

  const onCommentReply = (message) => {
    const comment = {
      content: message,
      parentCommentId: id,
      postId: postId
    }

    const customHeaders = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }

    console.log('Comment', comment)

    createComment(comment, customHeaders).then((res) => {
      setIsReplying(false)
      childComments.push(res)
    }).catch(e => console.log(e))
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
    if(!token){
      navigate('/login')
    }

    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }

    updateComment(id, message, headers).then((res) => {
      setIsEditing(false)
      setCommentContent(message)
    }).catch(e => console.log(e))
  }

  const onCommentDelete = () => {
    const headers = {
      Authorization: 'Bearer ' + token,
    }

    deleteComment(id, headers).then((res) => {
      console.log('Comment Deleted', res)
      window.location.reload()
    }).catch(e => console.log(e))
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
          <span className="name" style={{ marginRight: '0', marginLeft: 'auto', }}>{author}</span>
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
          {token && 
            <IconBtn
              onClick={() => setIsReplying(prev => !prev)}
              isActive={isReplying}
              Icon={FaReply}
              aria-label={isReplying ? "Cancel Reply" : "Reply"}
            />
          }
          {currentUser?.id && (
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
              <CommentList comments={childComments} postId={postId} />
            </div>
          </div>
        </>
      )}
    </>
  )
}