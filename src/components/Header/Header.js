import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="Header">
      <div className="container inner">
        <h3 className="title">My blog</h3>
        <ul className="links-list">
          <li>
            <NavLink exact className="link" to="/posts">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact className="link" to="/posts/add">
              Add
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
