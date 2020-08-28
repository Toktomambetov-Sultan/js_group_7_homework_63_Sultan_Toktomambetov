import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Server } from "../../server";

import "./Home.css";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const initPostsList = async () => {
    const response = await Server.getPosts();
    console.log(response);
    setPostsList(response ? response : []);
  };
  useEffect(() => {
    initPostsList();
  }, []);
  return (
    <div className="Home">
      <div className="container">
        {Object.keys(postsList).length ? (
          <div className="posts-list">
            {Object.keys(postsList).map(key => {
              const post = postsList[key];
              return (
                <div className="post" key={key}>
                  <div className="post__top">
                    <h4 className="post__title">{post.title}</h4>
                    <span className="post__datetime">
                      Created: {moment(post.date).format("DD MMM HH:mm:ss")}
                    </span>
                  </div>
                  <Link to={"/post/" + post.id} className="post__link">
                    Read more
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h3>add some post</h3>
        )}
      </div>
    </div>
  );
}
