import React, { useState } from 'react';
// import '../css/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import { LoginAPI } from '../URL/ApiList';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';






const Login = ({toggleBtn}) => {
  const [inputState, setInputState] = useState({
    userName: '',
    password: ""
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

  const handleSubmit = async(e) => {
    //const history = useHistory();
    //console.log("submit",data);

    e.preventDefault();
    const { userName, password } = inputState;



    if (userName === "") {
      toast.error('Please Enter Valid User Name',{duration: 5000,position: 'top-center'});
      return;
    }


    if (password === "") {
      toast.error('Please Enter the Password',{duration: 5000,position: 'top-center'});
      return;
    }


    // console.log("submit value", inputState);

    try{
      let loginCall = await axios.post(LoginAPI, inputState);
      //console.log("loginCall", loginCall.data);
      let loginData = loginCall.data;
      localStorage.setItem("AuthToken", loginData.token);
      localStorage.setItem("userName",inputState.userName );
      if(loginData.response === 1){
        toast.success('Login Successfull',{duration: 3000,position: 'top-center'});   
         navigate('/dashboard',{ replace: true });
      }else{
        toast.error('Invalid Credentials',{duration: 3500,position: 'top-center'});
      }

    }catch(err){
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
    // <div id='Login'>
      <div className="wrapper form">
        <h1>Sign In</h1>
        <p>Welcome back you've <br /> been missed!</p>
        <form className="">

          <input
            type="text"
            placeholder="Enter User Name"
            name="userName"
            onChange={setVal}
            value={inputState.userName}
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
{/* 
          <p className="recover mt-1">
            <a href="#">Forgot your Password</a>
          </p> */}

        </form>
        <button onClick={(e) => handleSubmit(e)}>Sign In</button>
        {/* <p className="or">
            ----- or continue with -----
          </p>
          <div className="icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-github"></i>
            <i className="fab fa-facebook"></i>
          </div> */}
        <div className="not-member">
          Not a member? <small><Link to="/" onClick={toggleBtn}>Register Now</Link></small>
        </div>
      </div>
    // </div>


  )
}

export default Login