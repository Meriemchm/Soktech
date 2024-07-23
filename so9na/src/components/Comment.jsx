import React from "react";
import CommentForm from "./CommentForm";
import { FaStar } from "react-icons/fa";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  rating,
  parentId = null,
  user,
  service
}) => {
  // Determine whether the comment is being edited or replied to
  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing";
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";

  // Determine whether the comment owner can delete, reply or edit the comment
  const isCommentOwner = user.id === comment.userId;
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = isCommentOwner && !timePassed;
  const canReply = Boolean(user.id) && parentId === null;
  const canEdit = isCommentOwner && !timePassed;

  // Determine the comment's creation date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} at ${hours}:${minutes}:${seconds}`;
  };
  const createdAt = formatDate(comment.created_at);

  // Set the image URL
  const imageUrl = `http://localhost:8000/storage/users/${comment.userpic}`;

  // Render the comment
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={imageUrl} alt="commenter" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
          <div className="comment-rating">
            {[...Array(rating)].map((star, i) => (
              <FaStar color="#E1E15E" size={20} key={i} />
            ))}
          </div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => {
              updateComment(comment.id, text, comment.rating);
              setActiveComment(null);
            }}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "replying"
                })
              }
            >
              repondre
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment.id,
                  type: "editing"
                })
              }
            >
              editer
            </div>
          )}
                    {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              supprimer
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => {
              addComment(text, comment.id, service, user, 0);
              setActiveComment(null);
            }}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                rating={0}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

