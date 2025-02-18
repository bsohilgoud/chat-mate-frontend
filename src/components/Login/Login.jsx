import React, { useState } from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { WebSocket } from "ws";

const Login = () => {
  const navigate = useNavigate();

  const login = async (username, password) => {
    console.log("login");

    try {
       const loginRequest = {
         method: "POST",
         credentials: "include",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           username,
           password,
         }),
       };

       const response = await fetch(
         "http://localhost:8080/auth/login",
         loginRequest
       );

      const responseJson = await response.json();
      console.log(`Login response:`, responseJson);


      /* Here since we are using browser, we dont need to get the cookie, it will be passed automatically :)
        1. In the initial login request -> the Cookie -> wiil be stored in the Application storage (JSESSIONID, e4245n...)
        2. For every other requests it will share on include these cookies --- Yay!!! Cool

      */
      // // Store the cookies/session information
      // const cookies = response.headers.get("set-cookie");
      // console.log(`cookies: ${cookies}` );


      if (response.ok) {
        /* Try to use Context, Redux (standard) approach to share the userId state across the components */
        localStorage.setItem("userId", responseJson.userId);
        navigate("/chat");
      } else {
        console.error("Login failed:", responseJson);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  function loginUser() {
    console.log("login");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // login(username, password);
    login("saikumar123@gmail.com", "Password@1234");
  }

  return (
    <>
      <div className="login-page">
        <div className="main-container">
          <div className="child left">
            <div className="image">
              <div className="register-note">
                <p> {"Don't have an Account"} </p>
                <button id="sign-up">{"Sign Up"}</button>
              </div>
            </div>
          </div>
          <div className="child right">
            <div className="header"> {"Chat Mate"} </div>
            <div>
              <div className="login-form">
                {/* <div className="input-block"> */}
                {/* <FaUser className="icon icon-fa-user"/> */}
                <input type="email" id="username" placeholder="Your email" />
                {/* </div> */}
                <input
                  type="password"
                  id="password"
                  placeholder="Your password"
                ></input>
                <p id="forgot-password">
                  <a href="#"> {"Forgot password ?"}</a>
                </p>
                <button id="login-btn" onClick={loginUser}>
                  {" "}
                  {"Login"}{" "}
                </button>
              </div>
            </div>
            <div> {"Footer"} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
