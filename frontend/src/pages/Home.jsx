import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then(res => {
        console.log(res.data); // debug API response
        setPosts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      {posts.length > 0 ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default Home;
