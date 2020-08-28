import Axios from "axios";

import "jodit";
import JoditEditor from "jodit-react";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import "./AddPage.css";
import "jodit/build/jodit.min.css";

const AddPage = () => {
  const editor = useRef(null);
  const [data, setData] = useState({ content: "", title: "", date: null });
  const lastEditorValue = useRef(data.content);
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
          readonly: false, // all options from https://xdsoft.net/jodit/play.html
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
    const titleData = {
      title: data.title,
      date: new Date().toJSON(),
      id: new Date().getTime(),
    };
    const postsListResponse =
      (await Axios.get(
        "https://quickstart-1598216036127.firebaseio.com/posts.json"
      )) || [];
    await Axios.put(
      "https://quickstart-1598216036127.firebaseio.com/posts.json",
      [...postsListResponse.data, titleData]
    );
    const subjectData = {
      ...data,
      id: titleData.id,
    };
    const subjectsList =
      (await Axios.get(
        "https://quickstart-1598216036127.firebaseio.com/posts.json"
      )) || [];
    await Axios.put(
      "https://quickstart-1598216036127.firebaseio.com/posts.json",
      [...subjectsList.data, subjectData]
    );
  };
  return (
    <div className="AddPage">
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
