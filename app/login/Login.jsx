'use client';
import React, { useContext, useRef, useState } from 'react';
import classes from './login.module.css';
import { AuthContext } from '../providers/Authprovider';
import axios from 'axios';

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const setSignUpPage = () => {
    setIsLoginPage(false);
  };
  const setLoginPage = () => {
    setIsLoginPage(true);
  };

  const { isLoggedIn, setLoggedIn, setLoggedOut } = useContext(AuthContext);

  const signUpUser = async (email, username, password) => {
    try {
      const response = await axios.post(`/api/users/signup`, {
        email,
        username,
        password,
      });
      console.log('signup success', response.data);
      // setLoggedIn();
      setIsLoginPage(true);
    } catch (error) {
      console.log('signup failed', error?.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log('Login success', response.data);
      setLoggedIn();
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    // e.preventDefault();
    // return false;
    const userName = userNameRef?.current?.value;
    const password = passwordRef.current.value;
    const email = emailRef?.current?.value;
    try {
      if (isLoginPage) {
        loginUser(email, password);
      } else {
        signUpUser(email, userName, password);
      }
    } catch (error) {
      console.log(error);
    }

    // if (userName && password.length >= 8) {
    //   setLoggedIn();
    // } else {
    //   setLoggedOut();
    // }
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
        {/* <div>{isLoggedIn ? 'logged in' : 'not logged in'}</div> */}
        <div className={`${classes.appName}`}>TODO APP</div>
        <div className={`${classes.loginHeader}`}>
          {isLoginPage ? 'Login' : 'Sign up'}
        </div>
        {!isLoginPage && (
          <div className={`${classes.userNameContainer}`}>
            <label htmlFor="">Username</label>
            <input
              ref={userNameRef}
              className={classes.userNameInput}
              type="text"
            />
          </div>
        )}

        <div className={`${classes.userNameContainer}`}>
          <label htmlFor="">Email</label>
          <input
            ref={emailRef}
            className={classes.userNameInput}
            type="email"
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
            {isLoginPage ? 'Login' : 'Sign up'}
          </button>
        </div>
        {isLoginPage ? (
          <div className={`${classes.authSwitch}`}>
            New user?{' '}
            <span className={classes.link} onClick={setSignUpPage}>
              Sign-up
            </span>
          </div>
        ) : (
          <div className={`${classes.authSwitch}`}>
            Already have an account?{' '}
            <span className={classes.link} onClick={setLoginPage}>
              Log in
            </span>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
