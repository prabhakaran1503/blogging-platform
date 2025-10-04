import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/posts", form, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="border p-2 w-full mb-2 h-40"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Publish</button>
    </form>
  );
}

export default CreatePost;
