'use client';
import React from 'react';
import Authprovider from './providers/Authprovider';

const Provider = ({ children }) => {
  return <Authprovider>{children}</Authprovider>;
};

export default Provider;
