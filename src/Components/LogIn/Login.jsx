import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";

export default function Login() {
  const [form, setForm] = useState(true);

  let toggleForm = () => {
    setForm(!form);
  };

  const googleLogin = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async(result) =>{
        console.log(result);

    });
  }

  const handleLogin = (e)=>{
    e.preventDefault()
  }

  const handleRegister = (e)=>{

  }

  return (
    <div className="lcontainer">
      <div className="logContainer">
        {form ? (
          <>
            <div className="curved-shape"></div>

            <div className="form-box login">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div className="input-box">
                  <input type="text" required />
                  <label htmlFor="">Username</label>
                  <FontAwesomeIcon icon={faUser} className="icn" />
                </div>
                <div className="input-box">
                  <input type="password" required />
                  <label htmlFor="">Password</label>
                  <FontAwesomeIcon icon={faLock} className="icn" />
                </div>
                <div className="input-box">
                  <button className="btn1" type="submit">
                    Login
                  </button>
                </div>
                <p className="or">or</p>

                <button className="btn1" onClick={googleLogin} ><img src={require("../../../src/google-logo-9824.png")} alt="G" />Sign in with Google</button>
                <div className="regi-link">
                  <p>
                    Dont't have an account?{" "}
                    <span onClick={toggleForm} className="SignUpLink">
                      Sign up
                    </span>
                  </p>
                </div>
              </form>
            </div>
            <div className="info-content login">
              <div className="logo">
                <h1>ChitChat</h1>
              </div>
              <h2>Welcome Back!</h2>
              <p>Let's start a gossip.</p>
            </div>
          </>
        ) : (
          <>
            <div className="curved-shape2"></div>
            <div className="form-box register">
              <h2>Register</h2>
              <form onSubmit={handleLogin} >
                <div className="input-box">
                  <input type="text" required />
                  <label htmlFor="">Username</label>
                  <FontAwesomeIcon icon={faUser} className="icn" />
                </div>
                <div className="input-box">
                  <input type="mail" required />
                  <label htmlFor="">Email</label>
                  <FontAwesomeIcon icon={faEnvelope} className="icn" />
                </div>
                <div className="input-box">
                  <input type="password" required />
                  <label htmlFor="">Set Password</label>
                  <FontAwesomeIcon icon={faLock} className="icn" />
                </div>
                <div className="input-box">
                  <button className="btn1" type="submit">
                    Register
                  </button>
                </div>
                <p className="or">or</p>
                <button className="btn1" onClick={googleLogin} onSubmit={handleRegister}><img src={require("../../../src/google-logo-9824.png")} alt="G" />Sign up with Google</button>
                <div className="regi-link">
                  <p>
                    Already have an account?{" "}
                    <span onClick={toggleForm} className="SignInLink">
                      Sign In
                    </span>
                  </p>
                </div>
              </form>
            </div>
            <div className="info-content register">
              <div className="logo">
                <h1>ChitChat</h1>
              </div>
              <h2>Thank You!</h2>
              <p>Let's start a gossip.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
