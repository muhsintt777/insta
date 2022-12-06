import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import "./Feed.css";
import PostCard from "./postCard/PostCard";
import PostForm from "./postForm/PostForm";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const renderedPosts = posts.map((post) => {
    const hashtagsString = post.hashtags.join(" ");
    return (
      <PostCard
        key={post.id}
        message={post.message}
        hashtags={hashtagsString}
      />
    );
  });

  useEffect(() => {
    setError(null);
    const fetchData = async () => {
      try {
        let postsArr = [];
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          postsArr.push({ ...doc.data(), id: doc.id });
        });
        console.log(postsArr);
        setPosts([...postsArr]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="feed-container">
      <PostForm />
      {error ? <p>{error}</p> : null}
      <PostCard />
      {renderedPosts}
    </div>
  );
};

export default Feed;
