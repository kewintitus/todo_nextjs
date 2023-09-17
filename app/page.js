'use client';

import Login from './login/Login';
import { useContext } from 'react';
import { AuthContext } from './providers/Authprovider';

export default function Home() {
  const { isLoggedIn, setLoggedOut } = useContext(AuthContext);

  return (
    <main>
      {isLoggedIn ? <div>"Welcome user"</div> : <Login />}
      <button onClick={setLoggedOut}>logout</button>
    </main>
  );
}
