import React, { useState } from 'react';
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data, "authData");
        history("/aboutus");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <>
    <div className="loginFormDone">
      <div className="box">
        <form className="FormForLogin" autoComplete="off" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input type="text" name="email" required="required" />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="password" name="password" required="required" />
            <span>Password</span>
            <i></i>
          </div>
          {/* <div class="links">
          <a href="#">Forgot Password ?</a>
          <a href="#">Signup</a>
        </div> */}
          <input type="Submit" value="Login" className='submitForm' />
        </form>
      </div>
      </div>
    </>
  )
}

export default Login;
