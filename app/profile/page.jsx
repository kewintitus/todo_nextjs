'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  //   const [data, setData] = useState();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div>
      ProfilePage
      <h2>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button onClick={getUserDetails}>Get Details</button>
    </div>
  );
};

export default ProfilePage;
