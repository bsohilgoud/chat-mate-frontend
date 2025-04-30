import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    console.log("login");

    try {
      const response = await loginUser(username, password);
      const responseJson = response.data;

      console.log(`Login response:`, responseJson);

      /* Here since we are using browser, we dont need to get the cookie, it will be passed automatically :)
        1. In the initial login request -> the Cookie -> wiil be stored in the Application storage (JSESSIONID, e4245n...)
        2. For every other requests it will share on include these cookies --- Yay!!! Cool

      */
      // // Store the cookies/session information
      // const cookies = response.headers.get("set-cookie");
      // console.log(`cookies: ${cookies}` );

      if (response.status == 200) {
        /* Try to use Context, Redux (standard) approach to share the userId state across the components */
        sessionStorage.setItem("userId", responseJson.userId);
        navigate("/chat");
      } else {
        console.error("Login failed:", responseJson);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  function loginCurrentUser() {
    console.log("login");
    const usernameEl = document.getElementById(
      "username",
    ) as HTMLInputElement | null;
    const passwordEl = document.getElementById(
      "password",
    ) as HTMLInputElement | null;

    const username = usernameEl?.value || "";
    const password = passwordEl?.value || "";

    login(username, password);
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
                <button id="login-btn" onClick={loginCurrentUser}>
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
