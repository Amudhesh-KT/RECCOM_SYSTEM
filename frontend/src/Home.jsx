import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  Link,
} from "react-router-dom";
import Cookies from "js-cookie";

const AuthApi = React.createContext();
const TokenApi = React.createContext();

export const Home = () => {
  const [data, setData] = useState("");
  const Auth = React.useContext(AuthApi);
  const Token = React.useContext(TokenApi);
  const handleonclick = () => {
    Auth.setAuth(false);
    Cookies.remove("token");
  };
  let toke = Token.token;
  const headers = {
    Authorization: `Bearer ${toke}`,
  };
  const getdata = async () => {
    let res = await axios
      .get("http://127.0.0.1:8000/", { headers })
      .then((response) => {
        return response.data.data;
      });
    return res;
  };
  React.useEffect(async () => {
    let x = await getdata();
    setData(x);
    console.log(x);
  }, []);
  return (
    <>
      <h2>Home</h2>
      <h2>WELCOME TO HOME</h2>
      <button onClick={handleonclick}>Logout</button>
      <h1>{data}</h1>
    </>
  );
};