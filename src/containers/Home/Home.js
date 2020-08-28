import Axios from "axios";
import React from "react";
import { useEffect } from "react";

export default function Home() {
  const initMessages = async () => {
    const response = await Axios.get(
      "https://quickstart-1598216036127.firebaseio.com/posts.json"
    );
    console.log(response);
  };
  useEffect(() => {
    initMessages();
  }, []);
  return <div>Home</div>;
}
