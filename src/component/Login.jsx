import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import { LoginAPI } from '../URL/ApiList';
import axios from 'axios';
import { toast } from 'react-toastify';





const Login = () => {
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
      alert("Please Enter userName");
      // NotificationManager.warning("Enter Email", "Click to Remove", 5000);
      return;
    }


    if (password === "") {
      alert("Please Enter the Password...!");
      return;
    }


    // console.log("submit value", inputState);

    try{
      let loginCall = await axios.post(LoginAPI, inputState);
      console.log("loginCall", loginCall.data);
      let loginData = loginCall.data;
      localStorage.setItem("AuthToken", loginData.token);
      localStorage.setItem("userName",inputState.userName );
      if(loginData.response === 1){
        //alert("Login Successfull");
         toast("Login Successfull");
        // NotificationManager.success("Login Successfull", "Success", 5000);
         navigate('/dashboard',{ replace: true });
        
        
      }else{
        alert("Invalid Credentials");
      }

    }catch(err){
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
    <div id='Login'>
      <div className="wrapper">
        <h1>Sign In</h1>
        <p>Welcome back you've <br /> been missed!</p>
        <form>

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

          <p className="recover">
            <a href="#">Recover Password</a>
          </p>

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
          Not a member? <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>


  )
}

export default Login