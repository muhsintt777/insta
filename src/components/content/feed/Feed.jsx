import { onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { postsColRef } from "../../../firebase/config";
import "./Feed.css";
import PostCard from "./postCard/PostCard";
import PostForm from "./postForm/PostForm";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);

  const renderedPosts = posts.map((post) => {
    return (
      <PostCard
        key={post.id}
        id={post.id}
        message={post.message}
        hashtags={post.hashtags}
        image={post.imgUrl}
        imageName={post.imgName}
        uid={post.uid}
        createdAt={post.createdAt}
      />
    );
  });

  useEffect(() => {
    setError(null);

    const q = query(postsColRef, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setError(null);
      let postsArr = [];
      snapshot.docs.forEach((doc) => {
        postsArr.push({ ...doc.data(), id: doc.id });
      });
      if (!postsArr.length) {
        setError("Empty... Add new posts");
        setPosts([]);
        return;
      }
      setPosts([...postsArr]);
    });
  }, []);

  return (
    <div className="feed-container">
      {user ? <PostForm /> : null}
      {error ? <p>{error}</p> : null}
      {renderedPosts}
    </div>
  );
};

export default Feed;
