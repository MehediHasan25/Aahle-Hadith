import React from 'react';
import { useLocation } from 'react-router-dom';


const UpdateDataEnrollment = () => {
    const { state } = useLocation();

   // console.log("data", state);

  return (
    <div>
        <p> Your id is {state.donarId}</p>
    </div>
  )
}

export default UpdateDataEnrollment