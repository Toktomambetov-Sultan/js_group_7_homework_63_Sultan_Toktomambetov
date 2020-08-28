import "jodit";
import JoditEditor from "jodit-react";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import Grayback from "../../components/grayback/Grayback";
import { Server } from "../../server";
import "./AddPage.css";
import "jodit/build/jodit.min.css";

const AddPage = props => {
  const editor = useRef(null);
  const [data, setData] = useState({ content: "", title: "", date: null });
  const lastEditorValue = useRef(data.content);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    lastEditorValue.current = data.content;
  });
  const Editor = useMemo(
    () => (
      <JoditEditor
        ref={editor}
        value={lastEditorValue.current}
        tabIndex={1}
        config={{
          readonly: false,
        }}
        name="content"
        onChange={value => {
          setData(lastData => ({
            ...lastData,
            content: value,
          }));
        }}
      />
    ),
    [lastEditorValue]
  );
  const formSubmit = async event => {
    event.preventDefault();
    if (
      Object.values(data).reduce((acc, item) => {
        if (acc && item) return true;
        return false;
      }, true)
    )
      return;
    setLoading(true);
    await Server.addNewPost({
      title: data.title,
      subject: data.content,
    });
    setLoading(false);
    props.history.push({
      pathname: "/",
    });
  };
  return (
    <div className="AddPage">
      <Grayback show={loading} />
      <div className="container">
        <form onSubmit={e => formSubmit(e).catch(console.error)}>
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              textAlign: "center",
              fontSize: "22px",
            }}
            className="jodit-form__group"
          >
            <label>
              <h4>Title:</h4>
              <div className="jodit-input_group">
                <input
                  style={{ fontSize: "20px" }}
                  className="jodit-input"
                  name="title"
                  type="text"
                  value={data.title}
                  onChange={event => {
                    const value = event.target.value;
                    setData(lastData => ({
                      ...lastData,
                      title: value,
                    }));
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <h4 style={{ textAlign: "center", fontSize: "26px" }}>Content</h4>
            {Editor}
          </div>
          <button type="submit" className="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
