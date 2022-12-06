import React from "react";
import "./Feed.css";
import PostCard from "./postCard/PostCard";
import PostForm from "./postForm/PostForm";

const Feed = () => {
  return (
    <div className="feed-container">
      <PostForm />
      <PostCard />
    </div>
  );
};

export default Feed;
