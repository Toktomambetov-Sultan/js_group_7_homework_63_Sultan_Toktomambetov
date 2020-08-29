import React from "react";
import { useState } from "react";
import Grayback from "../../components/grayback/Grayback";
import PutPageForm from "../../components/putPageForm/putPageForm";
import { Server } from "../../server";
import "./AddPage.css";
import "jodit/build/jodit.min.css";

const AddPage = props => {
  const [data, setData] = useState({ content: "", title: "" });
  const [loading, setLoading] = useState(false);
  const formSubmit = async event => {
    event.preventDefault();
    if (!
      Object.values(data).reduce((acc, item) => {
        if (acc && item) return true;
        return false;
      }, true)
      )
      return;
      console.log(1);
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
        <PutPageForm data={data} setData={setData} formSubmit={formSubmit} />
      </div>
    </div>
  );
};

export default AddPage;
