import { onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { postsColRef } from "../../../firebase/config";
import "./Feed.css";
import PostCard from "./postCard/PostCard";
import PostForm from "./postForm/PostForm";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const renderedPosts = posts.map((post) => {
    const hashtagsString = post.hashtags?.join(" ");
    return (
      <PostCard
        key={post.id}
        id={post.id}
        message={post.message}
        hashtags={hashtagsString}
      />
    );
  });

  useEffect(() => {
    setError(null);

    const q = query(postsColRef, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      let postsArr = [];
      snapshot.docs.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });
      if (!postsArr.length) {
        setError("Realtime data fetching failed");
        return;
      }
      setPosts([...postsArr]);
    });
  }, []);

  return (
    <div className="feed-container">
      <PostForm />
      {error ? <p>{error}</p> : null}
      {renderedPosts}
    </div>
  );
};

export default Feed;
