// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";


// const AuthApi = React.createContext();
// // const TokenApi = React.createContext();


// export const Login = () => {
//     const Auth = React.useContext(AuthApi);
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const handleSubmit = async (evt) => {
//       if (evt) {
//         evt.preventDefault();
//       }
//       const data = {
//         username: name,
//         password: password,
//       };
//       const news = async () => {
//         let res = await axios
//           .post("http://127.0.0.1:8000/login", data)
//           .then((response) => {
//             console.log(response);
//             Cookies.set("token", response.data.access_token);
//             return response;
//           })
//           .catch((error) => {
//             console.log(error.message);
//           });
//         return res;
//       };
//       let x = await news();
//       if (x) {
//         window.location.reload();
//       }
//     };
//     return (
//       <>
//         <form
//           style={{
//             marginTop: "100px",
//             marginLeft: "50px",
//             border: "solid 1px",
//             width: "max-content",
//             borderColor: "green",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <div style={{ textAlign: "center" }}>Login</div>
//           <br />
//           <label>Username:</label>
//           <input
//             type="text"
//             className="username"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//           <br />
//           <br />
//           <label>Password: </label>
//           <input
//             type="password"
//             className="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//           <br />
//           <br />
//           <div style={{ textAlign: "center" }}>
//             <input type="submit" value="Submit" />
//           </div>
//         </form>
//       </>
//     );
//   };


import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Text,Modal,Button,Loading } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faEnvelope, faEye, faWarning } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const navigate = useNavigate();
    useEffect(() => {
        fetchItems();
      }, []);
      const [visible, setVisible] = React.useState(false);
      const [items, setItems] = useState([]);
      const fetchItems = async () => {
        const data = await fetch(
          "http://127.0.0.1:8000/user"
        );
          // console.log(data)
        const items = await data.json();
        console.log(items);
        setItems(items);
      };
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  // const users = [{ username: "amudhesh", password: "12345" }];
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = items.map((user) => user.username === username);
    const account_pass = items.map((user) => user.password === password);
    console.log(account)
    if (account === true && account_pass === true) {
      localStorage.setItem("authenticated", true);
      console.log("success")
      navigate("/home");

    }
    else{
        console.log("nope")
        setVisible(true);
    }
  }
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div class="parent">
  <div class="child1">
    <div class="centerelements">
      {/* <img src="/assets/Images/customerportallogo.png" alt="" class="plant-login-image"> */}
      {/* <h1 class="plant-cont1">Welcome to</h1>
      <h1 class="plant-cont">Digiverz</h1> */}
      <Text
          h1
          size={60}
          className="login_main_cont_hed"
          css={{
            textGradient: "45deg, $green600 10%, $blue600 90%",
          }}
          weight="bold"
        >
          Welcome to Digiverz
        </Text>
        <h2 className='algo_head'>ALGORITHM ANALYZER</h2>
        <p className='algo_tagline'>Selects the best suited Machine Learning algorithm</p>
    </div>
  </div>
  <div class="child2">
    <div class="container">
      <div class="signup-container">
        <h1 class="heading-primary">Portal Logon</h1>
        <p class="text-mute">Enter your login credentials</p>
        <form class="signup-form" onSubmit={handleSubmit}>
          <label class="inp">
            <input type="text" name="username" class="input-text" id="" placeholder=" " onChange={(e) => setusername(e.target.value)}/>
            <span class="label">User ID</span>
            <span class="input-icon">
            <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </label>
          <label class="inp">
            <input type="password" name="password"  class="input-text" placeholder=" " id="pass" onChange={(e) => setpassword(e.target.value)} />
            <span class="label">Password</span>
            <span class="input-icon input-icon-password">
            <FontAwesomeIcon icon={faEye} />
            </span>
          </label>
          <button className="prediction-btn-login" >Login</button>
        </form>
      </div>
    </div>
  </div>
  <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <FontAwesomeIcon className='popup__alert' icon={faWarning}/>
        <Modal.Header>
          
          <Text id="modal-title" size={18}>
            
            <Text b size={18}>
            Please Enter valid credentials
            </Text>
          </Text>
        </Modal.Header>
        
          
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          
        </Modal.Footer>
        <Loading color="error" type="points" />
      </Modal>
</div>


  )
}