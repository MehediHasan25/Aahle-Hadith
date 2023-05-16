import React, { useState } from 'react'
import '../css/Register.css';
import { Link } from 'react-router-dom';
import { RegisterAPI } from '../URL/ApiList';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const [inputState, setInputState] = useState({
    userName: '',
    email: '',
    userRole: 'user',
    phoneNumber: "",
    address: "",
    password: "",
    conPass: ""
  });
  const navigate = useNavigate();

  const setVal = (e) => {
    //e.preventDefult();
    // console.log("name", e.target.name);
    // console.log("val", e.target.value);

    const { name, value } = e.target;

    setInputState((prev) => {
     // console.log('prevVal', prev);
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    //console.log("submit",data);
    e.preventDefault();
    const { userName, email, phoneNumber, address, password, conPass } = inputState;

    if (userName === "") {
      alert("Please Enter Username");
      return;
    }

    if (email === "") {
      alert("Please Enter Email");
      return;
    }


    if (phoneNumber === "") {
      alert("Please Enter your Phone Number");
      return;
    }

    if(phoneNumber.length <11 || phoneNumber.length >=12 ){
      alert("Please Provide Correct Phone Number");
      return;
    }

    if (address === "") {
      alert("Please Enter the Address");
      return;
    }

    if (password === "") {
      alert("Please Enter Password");
      return;
    }



    if (password !== conPass) {
      alert('Password and Confirm Password are not same');
      return;
    }

    console.log("submit value", inputState);


    try {
      let registerCall = await axios.post(RegisterAPI,inputState);
      // console.log("RegisterAPIcall", registerCall.data);
      let registerData = registerCall.data;
      if(registerData.success){
        alert("Registration Completed");
        navigate('/');
      }

    } catch (err) {
      if (err.response) {
        let message = err.response.data.message;
        alert(message);
      } else if (err.request) {
        alert('Error Connecting ...', err.request);
      } else if (err) {
        alert(err.toString());
      }

    }

  }

  return (
    <div id="Register">
      <div className="wrapperRegister">
        <h1>Sign Up</h1>
        <form>
          <input
            type="text"
            placeholder="Enter username"
            name="userName"
            onChange={setVal}
            value={inputState.userName}
            autoComplete='off'
          />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={setVal}
            value={inputState.email}
            autoComplete='off'
          />

          <input
            type="text"
            placeholder="Enter Phone Number"
            name="phoneNumber"
            onChange={setVal}
            value={inputState.phoneNumber}
            autoComplete='off'
          />

          <input
            type="text"
            placeholder="Enter address"
            name="address"
            onChange={setVal}
            value={inputState.address}
            autoComplete='off'
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={setVal}
            value={inputState.password}
            autoComplete='off'
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="conPass"
            onChange={setVal}
            value={inputState.conPass}
            autoComplete='off'
          />
          {/* <p className="recover">
              <a href="#">Recover Password</a>
            </p> */}

        </form>
        <button onClick={(e) => handleSubmit(e)}>Sign UP</button>
        {/* <p className="or">
                ----- or continue with -----
              </p>
              <div className="icons">
                <i className="fab fa-google"></i>
                <i className="fab fa-github"></i>
                <i className="fab fa-facebook"></i>
              </div> */}
        <div className="not-member">
          already a member? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default Register