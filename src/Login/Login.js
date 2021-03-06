import React, { useState } from "react";

import "./Login.css";

import Axios from "axios";
import { useSpring, animated } from "react-spring";
import loginImg from "./logo.png";

function App() {
  if(localStorage.getItem("state") !== null){
    window.location.href="/FaceCounter";
  }
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF", //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="image">
        <img src={loginImg} alt="vts" style={{ width: 100 }} />
      </div>

      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Bejelentkezés
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Regisztráció
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}></animated.div>
    </div>
  );
}

//database
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const login = () => {
    var loggin = null
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
     
    }).then((response) => {
      if (response.data.message) {
        // setLoginStatus(response.data.message);
        
      } else {
        setLoginStatus(response.data[0].username);
        localStorage.setItem("state", "loggedIn");
        window.open("/FaceCounter", "_self");
      }
      console.log(response.data);
    });
  };

  const clickHandle = (event) => {
    event.preventDefault();
    login();

    console.log("You clicked the button");
  };
  return (
    <React.Fragment>
      <label for="username">Felhasználónév</label>
      <input
        type="text"
        id="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label for="password">Jelszó</label>
      <input
        type="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <input
        type="submit"
        value="Belépés"
        className="submit"
        onClick={clickHandle}
      />
    </React.Fragment>
  );
}

function RegisterForm() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Axios failed", error);
      });
  };
  
  return (
    <React.Fragment>
      <label for="fullname">Felhasználónév</label>
      <input
        type="text"
        id="fullname"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label for="password">jelszó</label>
      <input
        type="password"
        id="password"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <label for="confirmpassword">jelszó megerősítése</label>
      <input type="password" id="confirmpassword" />
      <input
        type="submit"
        value="Regisztráció"
        class="submit"
        onClick={register}
      />
    </React.Fragment>
    
  );
}

export default App;
