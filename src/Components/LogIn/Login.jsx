import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import React from 'react'

export default function Login() {
  return (
    <div className='lcontainer'>
        <div className="logContainer">
            <div className="curved-shape"></div>
            <div className="form-box login">
                <h2>Login</h2>
                <form action="">
                    <div className="input-box">
                        <input type="text" required/>
                        <label htmlFor="">Username</label>
                        <FontAwesomeIcon icon={faUser} className='icn'/>
                    </div>
                    <div className="input-box">
                        <input type="text" required/>
                        <label htmlFor="">Password</label>
                        <FontAwesomeIcon icon={faLock} className='icn'/>
                    </div>
                    <div className="input-box">
                        <button className="btn1" type='submit'>Login</button>
                    </div>
                    <div className="regi-link">
                        <p>Dont't have an account? <span>Sign up</span></p>
                    </div>
                </form>
            </div>
            <div className="info-content login">
            <div className="logo"><h1>ChitChat</h1></div>
                <h2>Welcome Back!</h2>
                <p>Let's start a gossip.</p>
            </div>
            <div className="form-box register">
                <h2>Register</h2>
                <form action="">
                    <div className="input-box">
                        <input type="text" required/>
                        <label htmlFor="">Username</label>
                        <FontAwesomeIcon icon={faUser} className='icn'/>
                    </div>
                    <div className="input-box">
                        <input type="text" required/>
                        <label htmlFor="">Password</label>
                        <FontAwesomeIcon icon={faLock} className='icn'/>
                    </div>
                    <div className="input-box">
                        <button className="btn1" type='submit'>Register</button>
                    </div>
                    <div className="regi-link">
                        <p>Dont't have an account? <span>Sign In</span></p>
                    </div>
                </form>
            </div>
            <div className="info-content register">
                <h2>Welcome Back!</h2>
                <p>Let's start a gossip.</p>
            </div>
        </div>

    </div>
  )
}
