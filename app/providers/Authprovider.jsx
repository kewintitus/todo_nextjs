'use client';
import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  // setIsLoggedIn: () => {},
});

const Authprovider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };
  const setLoggedOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, setLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authprovider;
