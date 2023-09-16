'use client';
import React, { useContext, useRef, useState } from 'react';
import classes from './login.module.css';
import { AuthContext } from '../providers/Authprovider';

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const [isLoginPage, setIsLoginPage] = useState(true);

  const setSignUpPage = () => {
    setIsLoginPage(false)
  }
  const setLoginPage = () => {
    setIsLoginPage(true)
  }

  const { isLoggedIn, setLoggedIn, setLoggedOut } = useContext(AuthContext);

  const submit = (e) => {
    // e.preventDefault();
    // return false;
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    if (userName && password.length >= 8) {
      setLoggedIn();
    } else {
      setLoggedOut();
    }
  };
  console.log(isLoggedIn);
  return (
    <form
      className={`${classes.loginPage}`}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={`${classes.loginCard}`}>
        <div>{isLoggedIn ? 'logged in' : 'not logged in'}</div>
        <div className={`${classes.loginHeader}`}>Login</div>
        <div className={`${classes.userNameContainer}`}>
          <label htmlFor="">Username</label>
          <input
            ref={userNameRef}
            className={classes.userNameInput}
            type="text"
          />
        </div>
        <div className={`${classes.passwordContainer}`}>
          <label>Password</label>
          <input
            ref={passwordRef}
            className={classes.passwdInput}
            type="password"
          />
        </div>
        <div className={`${classes.loginBtnCont}`}>
          <button type="submit" className={`${classes.loginBtn}`}>
            Login
          </button>
        </div>
        <div>
          New user? <span onClick={}>Sign-up</span>
        </div>
      </div>
    </form>
  );
};

export default Login;
