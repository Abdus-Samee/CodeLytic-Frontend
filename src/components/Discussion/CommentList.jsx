import { Comment } from "./Comment"

export function CommentList({ comments, postId }) {
  return comments.map(comment => (
    <div key={comment.id} className="comment-stack">
      <Comment {...comment} postId={postId} />
    </div>
  ))
}