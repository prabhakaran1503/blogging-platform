import React from "react";

function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
    </div>
  );
}

export default PostCard;
