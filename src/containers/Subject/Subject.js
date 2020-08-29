import Parser from "html-react-parser";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Grayback from "../../components/grayback/Grayback";
import { Server } from "../../server";
import "./Subject.css";

export default function SubjectPage(props) {
  const [subject, setSubject] = useState({ content: "" });
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      const initSubject = async () => {
        setLoading(true);
        const subjectResponse = await Server.getSubjectById(
          props.match.params.id
        );
        setLoading(false);
        setSubject(
          subjectResponse ? subjectResponse : "<h3>Вы не туда попали.</h3>"
        );
      };
      initSubject().catch(console.error);
    },
    [props]
  );

  const deletePost = async () => {
    setLoading(true);
    await Server.deletePostById(props.match.params.id);
    setLoading(false);
    props.history.push({
      pathname: "/",
    });
  };
  const EditLink = async () => {
    props.history.push(props.location.pathname + "/edit");
  };
  return (
    <div className="Subject container">
      <Grayback show={loading} />
      <div className="buttons">
        <button
          className="delete"
          onClick={() => deletePost().catch(console.error)}
        >
          delete
        </button>
        <button className="edit" onClick={EditLink}>
          edit
        </button>
      </div>
      <div className="body">
        {subject.subject ? Parser(subject.subject) : null}
      </div>
    </div>
  );
}
