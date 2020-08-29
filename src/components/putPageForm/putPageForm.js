import "jodit";
import JoditEditor from "jodit-react";
import React from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./PutPageForm.css";

export default function PutPageForm({ data, formSubmit, setData }) {
  const editor = useRef(null);
  const lastEditorValue = useRef(data.content);
  const Editor = useMemo(
    () => {
      return (
        <JoditEditor
          ref={editor}
          value={lastEditorValue.lastData}
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
      );
    },
    [lastEditorValue, setData]
  );
  useEffect(
    () => {
      lastEditorValue.current = data.content;
    },
    [data.content]
  );
  return (
    <div className="PutPageForm">
      <form onSubmit={e => formSubmit(e).catch(console.error)}>
        <div className="jodit-form__group">
          <label>
            <h4>Title:</h4>
            <div className="jodit-input_group form__group">
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
  );
}
