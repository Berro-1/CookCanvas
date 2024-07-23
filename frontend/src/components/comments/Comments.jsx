import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

const Comments = ({ recipeId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost/cookcanvas/backend/comments/getComments.php?recipe_id=${recipeId}`);
        if (response.data.status === 'success') {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post('http://localhost/cookcanvas/backend/comments/addComment.php', {
        recipe_id: recipeId,
        user_id: userId,
        comment: newComment
      });

      if (response.data.status === 'success') {
        setComments([...comments, { comment: newComment, username: 'You', created_at: new Date().toISOString() }]);
        setNewComment('');
      } else {
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p><strong>{comment.username}:</strong> {comment.comment}</p>
              <p><small>{new Date(comment.created_at).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
    </div>
  );
};

export default Comments;
