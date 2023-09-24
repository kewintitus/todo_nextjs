'use client';
import React, { useRef } from 'react';
import classes from './signup.module.css';
import Link from 'next/link';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';

const page = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const router = useRouter();

  const signUpUser = async () => {
    try {
      const userName = userNameRef?.current?.value;
      const password = passwordRef.current.value;
      const email = emailRef?.current?.value;
      const response = await axios.post('/api/users/signup', {
        username: userName,
        email,
        password,
      });
      router.push('/signin');
      console.log('SignUp success', response.data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Error while signing up' },
        { status: 400 }
      );
    }
  };

  const submit = (e) => {
    e.preventDefault();
    signUpUser();
    // return false;
  };
  return (
    <form className={`${classes.loginPage}`} onSubmit={submit}>
      <div className={`${classes.loginCard}`}>
        {/* <div>{isLoggedIn ? 'logged in' : 'not logged in'}</div> */}
        <div className={`${classes.appName}`}>TODO APP</div>
        <div className={`${classes.loginHeader}`}>Sign up</div>

        <div className={`${classes.userNameContainer}`}>
          <label htmlFor="">Username</label>
          <input
            ref={userNameRef}
            className={classes.userNameInput}
            type="text"
          />
        </div>

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
            Signup
          </button>
        </div>

        <div className={`${classes.authSwitch}`}>
          New user?{' '}
          <Link href="/signin" className={classes.link}>
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default page;
