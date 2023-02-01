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

export const Register = () => {
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("")
    const [company, setCompany] = useState("");
    const [password, setPassword] = useState("");
    // const [confrimPassword, setconfrimPassword] = useState("")
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const data = {
        username: name,
        email_id: Email,
        company: company,
        password: password,
        // confrimPassword: confrimPassword
      };
      axios
        .post("http://127.0.0.1:8000/register", data)
        .then((response) => {
          console.log(response);
          alert(response);
        })
        .catch((error) => {
          alert(error);
        });
    };
    return (
      <>
        <form
          style={{
            marginTop: "100px",
            marginLeft: "50px",
            border: "solid 1px",
            width: "max-content",
            borderColor: "green",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ textAlign: "center" }}>Register Yourself</div>
          <br />
          <label>Username:</label>
          <input
            type="text"
            className="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          <br />
          <label>Email ID: </label>
          <input
            type="text"
            className="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <br />
          <label>Company: </label>
          <input
            type="text"
            className="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          ></input>
          <br />
          <br />
          <label>Password: </label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <br />
          {/* <label>Confirm Password: </label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setconfrimPassword(e.target.value)}
          ></input>
          <br />
          <br /> */}
          <button className="prediction-btn-login" onSubmit={handleSubmit}>Login</button>
        </form>
      </>
    );
  }