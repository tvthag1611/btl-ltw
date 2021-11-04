import axios from "axios";
import React, { useState, useEffect } from "react";
import Picture from "../../elements/picture/Picture";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getALlPosts = async () => {
    const res = await axios.get(`/post/getAllPosts`);
    if (res.status == 200 && res.statusText == "OK") {
      setPosts(res.data);
    }
  };

  useEffect(() => {
    getALlPosts();
  }, []);

  return (
    <div className="home flex">
      <div className="flex flex-col">
        {posts.map((post, index) => {
          if (index % 5 === 0) {
            return (
              <Picture
                title={post.titlePost}
                thumnail={post.urlPicture}
                id={post.idPost}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col">
        {posts.map((post, index) => {
          if (index % 5 === 1) {
            return (
              <Picture
                title={post.titlePost}
                thumnail={post.urlPicture}
                id={post.idPost}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col">
        {posts.map((post, index) => {
          if (index % 5 === 2) {
            return (
              <Picture
                title={post.titlePost}
                thumnail={post.urlPicture}
                id={post.idPost}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col">
        {posts.map((post, index) => {
          if (index % 5 === 3) {
            return (
              <Picture
                title={post.titlePost}
                thumnail={post.urlPicture}
                id={post.idPost}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-col">
        {posts.map((post, index) => {
          if (index % 5 === 4) {
            return (
              <Picture
                title={post.titlePost}
                thumnail={post.urlPicture}
                id={post.idPost}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
