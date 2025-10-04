import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Blogging</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => { logout(); navigate("/"); }}
            >
              Logout
            </button>
            <Link to="/create" className="bg-green-500 text-white px-3 py-1 rounded">
              New Post
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="bg-blue-500 text-white px-3 py-1 rounded">
                Admin
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700">Login</Link>
            <Link to="/register" className="text-gray-700">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
