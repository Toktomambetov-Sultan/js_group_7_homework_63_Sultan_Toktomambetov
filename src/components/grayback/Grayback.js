import React from "react";
import "./grayback.css";
export default function Grayback({ show }) {
  return (
    <div className="grayback" style={{ display: show ? "block" : "none" }} />
  );
}
