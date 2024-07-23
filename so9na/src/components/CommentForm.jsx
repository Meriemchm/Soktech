import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  rating
}) => {
  const [text, setText] = useState(initialText);

  // Determine whether the textarea is disabled
  const isTextareaDisabled = text.length === 0;

  // Handle form submission
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, rating);
    setText("");
  };

  // Render the comment form
  return (
    <div className="comment-service">
      <form onSubmit={onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="comment-form-buttons">
          <button
            className="comment-form-button"
            disabled={isTextareaDisabled || rating}
          >
            {submitLabel}
          </button>
          {hasCancelButton && (
            <button
              type="button"
              className="comment-form-button comment-form-cancel-button"
              onClick={handleCancel}
            >
              annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
