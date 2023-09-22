'use client';
import React, { useRef } from 'react';
import classes from './signin.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      router.push('/');
      console.log('Login success', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const userName = userNameRef?.current?.value;
    const password = passwordRef.current.value;
    const email = emailRef?.current?.value;

    loginUser(email, password);
  };

  return (
    <form className={`${classes.loginPage}`} onSubmit={submit}>
      <div className={`${classes.loginCard}`}>
        {/* <div>{isLoggedIn ? 'logged in' : 'not logged in'}</div> */}
        <div className={`${classes.appName}`}>TODO APP</div>
        <div className={`${classes.loginHeader}`}>Login</div>

        {/* <div className={`${classes.userNameContainer}`}>
          <label htmlFor="">Username</label>
          <input
            ref={userNameRef}
            className={classes.userNameInput}
            type="text"
          />
        </div> */}

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
            Login
          </button>
        </div>

        <div className={`${classes.authSwitch}`}>
          New user?{' '}
          <Link href="/signup" className={classes.link}>
            Sign-up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default page;
