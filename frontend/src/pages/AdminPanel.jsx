import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/admin/users", { headers: { Authorization: `Bearer ${user.token}` } })
       .then((res) => setUsers(res.data));
    api.get("/posts").then((res) => setPosts(res.data));
  }, [user]);

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
    setUsers(users.filter((u) => u._id !== id));
  };

  const deletePost = async (id) => {
    await api.delete(`/admin/posts/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
    setPosts(posts.filter((p) => p._id !== id));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold text-lg mb-2">Users</h2>
        {users.map((u) => (
          <div key={u._id} className="flex justify-between border-b py-2">
            <span>{u.username} ({u.email})</span>
            <button className="bg-red-500 text-white px-2 rounded" onClick={() => deleteUser(u._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-bold text-lg mb-2">Posts</h2>
        {posts.map((p) => (
          <div key={p._id} className="flex justify-between border-b py-2">
            <span>{p.title}</span>
            <button className="bg-red-500 text-white px-2 rounded" onClick={() => deletePost(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
