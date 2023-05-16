import React from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const { state } = useLocation();
  console.log("state", state);

  return (
    <div>
      <p>My email Address is {state.email}</p>
    </div>
  )
}

export default Details