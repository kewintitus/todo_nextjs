'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyUser', { token });
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    console.log(urlToken);
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token?.length !== 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div>
      <h1>Verify Email</h1>
      <h2>{token ? `${token}` : 'no token'}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/signin">Login</Link>
        </div>
      )}
      {error && <div>Error</div>}
    </div>
  );
};

export default VerifyEmailPage;
