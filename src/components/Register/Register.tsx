import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Register = () => {

  const navigate = useNavigate();
  function loginUser() {
    console.log("Register");
  }

  function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;

    console.log("Inside register");
    register(username, password, username);
  }

  async function register(username, password, displayName) {
    const registerUrl = "http://localhost:8080/auth/register";
    const registerUserRequestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        displayName,
      }),
    };

    const response = await fetch(registerUrl, registerUserRequestData);
    console.log(`register response body : ${response.body}`);

      const resText = await response.text();
      if (response.ok()) {
          navigate("/login")
      }

    console.log(`register response : ${resText}`);
  }

  return (
    <>
      <div className="register-page">
        <div className="main-container">
          <div className="child left">
            <div className="image">
              <div className="register-note">
                <p> {"Already have an Account ?"} </p>
                <button id="sign-up" onClick={() => navigate("/login")}>
                  {"Login"}
                </button>
              </div>
            </div>
          </div>
          <div className="child right">
            <div className="header"> {"Chat Mate"} </div>
            {/* <div className="error-alert"></div> */}
            <div>
              <div className="register-form">

                <input type="email" id="username" placeholder="Your email">
                    <FaUser/>
                </input>
                <input
                  type="password"
                  id="password"
                  placeholder="Your password"
                ></input>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm password"
                ></input>
                <button id="register-btn" onClick={registerUser}>
                  {"register"}
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

export default Register;
