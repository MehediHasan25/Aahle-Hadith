import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import '../css/AuthLayout.css';
import logo from "../assets/logo.png"
const AuthLayout = () => {
const [active, setactive] = useState(false)
  const toggleBtn = () => {
    setactive(!active)
  }
  // const signInBtn = () => {
  //   setactive(!active)
  // }
  return (
    <div className="auth_body">

    <div className={ active? "wrap_container right-panel-active" : "wrap_container"}>
      <div className="form-container sign-up-container">
        <Register toggleBtn={ toggleBtn}/>
      </div>
      <div className="form-container sign-in-container">
        <Login toggleBtn={ toggleBtn}/>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
          <div className="logo">
              <img src={logo} alt="" />
            </div>
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn" onClick={toggleBtn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={toggleBtn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;
