import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grayback from "../../components/grayback/Grayback";
import PutPageForm from "../../components/putPageForm/putPageForm";
import { Server } from "../../server";

export default function EditPage(props) {
  const [data, setData] = useState({ content: "", title: "" });
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      const initData = async () => {
        const response = await Server.getSubjectById(props.match.params.id);
        console.log(response.subject);
        setData({
          content: response.subject,
          title: response.title,
        });
      };
      initData().catch(console.error);
    },
    [props]
  );
  console.log(data);
  const formSubmit = async () => {
    setLoading(true);
    Server.updatePostById(props.match.params.id, {
      title: data.title,
      subject: data.content,
    });
    setLoading(false);
    props.history.push({
      pathname: "/",
    });
  };
  return (
    <div>
      <Grayback show={loading} />
      <div className="container">
        <PutPageForm formSubmit={formSubmit} data={data} setData={setData} />
      </div>
    </div>
  );
}
