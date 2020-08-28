import Axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const initPostsList = async () => {
    const response = await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/postsList.json"
    );
    setPostsList(response.data ? response.data : []);
  };
  useEffect(() => {
    initPostsList();
  }, []);
  return (
    <div className="Home">
      <div className="container">
        <div className="posts-list">
          {postsList.map(post => (
            <div className="post">
              <div className="post__top">
                <h4 className="post__title">{post.title}</h4>
                <span className="post__datetime">
                  Created: {moment(post.date).format("DD MMM HH:mm:ss")}
                </span>
              </div>
              <Link to="/" className="post__link">Read more</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
