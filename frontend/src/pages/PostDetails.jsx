import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
    api.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  const addComment = async () => {
    const res = await api.post(`/comments/${id}`, { content: newComment }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setComments([...comments, res.data]);
    setNewComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>

      <h2 className="mt-4 font-bold">Comments</h2>
      <ul>
        {comments.map((c) => (
          <li key={c._id} className="border-b py-2">
            <strong>{c.author.username}: </strong>{c.content}
          </li>
        ))}
      </ul>

      {user && (
        <div className="mt-4">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Write a comment..."
          />
          <button onClick={addComment} className="bg-blue-500 text-white px-3 py-1 rounded">
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
