import React, { useState } from 'react'
import '../css/Register.css';
import { Link } from 'react-router-dom';
import { RegisterAPI } from '../URL/ApiList';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


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
      toast.error("Please Enter Your Email",{duration: 5000,position: 'top-center'});
      return;
    }

    
    if(phoneNumber === ""){
      toast.error("Please Enter Phone Number",{duration: 5000,position: 'top-center'});
      return;
  }
  
  if(new RegExp("^(?:\\+88|88)?(01[3-9]\\d{8})$").test(phoneNumber) === false){
      toast.error("Please Enter Valid Phone Number",{duration: 5000,position: 'top-center'});
      return;
  }

    if (address === "") {
      toast.error("Please Enter the Address",{duration: 5000,position: 'top-center'});
      return;
    }

    if (password === "") {
      toast.error("Please Enter Password",{duration: 5000,position: 'top-center'});
      return;
    }



    if (password !== conPass) {
      toast.error('Password and Confirm Password are not same',{duration: 5000,position: 'top-center'});
      return;
    }

    console.log("submit value", inputState);


    try {
      let registerCall = await axios.post(RegisterAPI,inputState);
      // console.log("RegisterAPIcall", registerCall.data);
      let registerData = registerCall.data;
      if(registerData.success){
        toast.success('Registration Successfully Completed',{duration: 4000,position: 'top-center'});   
        navigate('/');
      }

    } catch (err) {
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
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