import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('AuthToken'); // Assuming the token is stored in local storage
    if (token) {
      const expirationTime = jwtDecode(token).exp;
      const currentTime = new Date().getTime();
      return currentTime < expirationTime;
    }
    return false;
  };

  return isAuthenticated() ? (
    <Outlet/>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
