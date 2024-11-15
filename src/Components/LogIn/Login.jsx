import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Items/Firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// import Loading from "../../Items/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState(false);

  let toggleForm = () => {
    setForm(!form);
  };

  const [loading, setLoading] = useState(false);

  // simple login

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully Login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { userName, email, password } = Object.fromEntries(formData);
    
    console.log("usr",auth.currentUser)
    // Check if user is authenticated
    // if (!auth.currentUser) {
    //   toast.error("User not authenticated");
    //   setLoading(false);
    //   return;
    // }

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another userName");
    } 

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        userName,
        email,
        password,
        id: res.user.uid,
        method: "Email",
        blocked: [],
        // online:[],
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });
      toast.success("Successfully created an account!");

      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in after registration!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // firebase google login

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userData = {
          email: user.email,
          userName: user.displayName,
          avatar: user.photoURL,
          id: user.uid,
          method: "Google",
          blocked: [],
        };

        // Check if user is authenticated
        if (!auth.currentUser) {
          toast.error("User not authenticated");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDocs(userRef);

        if (userDoc.exists()) {
          toast.success("Logged in with Google successfully!");
          return;
        }

        await setDoc(userRef, userData, { merge: true });

        await setDoc(doc(db, "userChats", user.uid), {
          chats: [],
        });

        toast.success("Logged in with Google successfully!");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="lcontainer">
      <ToastContainer theme="dark" />
      <div className="logContainer">
        {form ? (
          <>
            <div className="curved-shape2"></div>
            <div className="form-box register">
              <h2>Register</h2>
              <form onSubmit={handleRegister} autoComplete="off">
                <div className="input-box">
                  <input type="text" required name="userName" />
                  <label>Username</label>
                  <FontAwesomeIcon icon={faUser} className="icn" />
                </div>
                <div className="input-box">
                  <input type="mail" required name="email" />
                  <label htmlFor="">Email</label>
                  <FontAwesomeIcon icon={faEnvelope} className="icn" />
                </div>
                <div className="input-box">
                  <input type="password" required name="password" />
                  <label htmlFor="">Set Password</label>
                  <FontAwesomeIcon icon={faLock} className="icn" />
                </div>
                <div className="input-box">
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
                <p className="or">or</p>
                <button
                  className="btn1"
                  onClick={googleLogin}
                  disabled={loading}
                >
                  <img
                    src={require("../../../src/google-logo-9824.png")}
                    alt="G"
                  />
                  Sign up with Google
                </button>
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
        ) : (
          <>
            <div className="curved-shape"></div>

            <div className="form-box login">
              <h2>Login</h2>
              <form onSubmit={handleLogin} autoComplete="off">
                <div className="input-box" style={{ display: "none" }}></div>
                <div className="input-box">
                  <input type="mail" required name="email" />
                  <label htmlFor="">Email Id</label>
                  <FontAwesomeIcon icon={faEnvelope} className="icn" />
                </div>
                <div className="input-box">
                  <input type="password" required name="password" />
                  <label htmlFor="">Password</label>
                  <FontAwesomeIcon icon={faLock} className="icn" />
                </div>
                <div className="input-box">
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
                <p className="or">or</p>

                <button
                  className="btn1"
                  onClick={googleLogin}
                  disabled={loading}
                >
                  <img
                    src={require("../../../src/google-logo-9824.png")}
                    alt="G"
                  />
                  Sign in with Google
                </button>
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
        )}
      </div>
    </div>
  );
}
