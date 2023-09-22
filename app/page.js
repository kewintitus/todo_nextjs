'use client';
import axios from 'axios';

import Login from './login/Login';
import { useContext } from 'react';
import { AuthContext } from './providers/Authprovider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const logoutUser = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      window.alert('Loggedout !');
      router.push('/signin');
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <main>
      Welcome User
      <button onClick={logoutUser}>Logout</button>
    </main>
  );
}
