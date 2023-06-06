import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


export function isTokenExpired(token) {
  if (!token) {
    return true; // Token is not provided
  }

  const decodedToken = jwtDecode(token); // Decode the token (implementation depends on your token format)
  const currentTime = Date.now() / 1000; // Get the current time in seconds

  return decodedToken.exp < currentTime; // Compare expiration time with current time
}

const withAuthentication = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('AuthToken');
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('AuthToken'); // Remove token from local storage
        localStorage.removeItem('userName'); // Remove userName from local storage
        navigate('/'); // Redirect to the login page
      }
    }, []);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuthentication;