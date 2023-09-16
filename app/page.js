'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Login from './login/Login';
import { useContext } from 'react';
import { AuthContext } from './providers/Authprovider';

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return <main>{isLoggedIn ? <div>"Welcome user"</div> : <Login />}</main>;
}
