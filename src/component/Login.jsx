import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { NotificationManager} from 'react-notifications';



const Login = () => {
  const [inputState, setInputState] = useState({
    email: '',
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

  const handleSubmit = (e) => {
    //const history = useHistory();
    //console.log("submit",data);

    e.preventDefault();
    const { email, password } = inputState;



    if (email === "") {
      alert("Please Enter Email");
      // NotificationManager.success('You have added a new book!', 'Successful!', 2000);

      return;
    }


    if (password === "") {
      alert("Please Enter the Password");
      return;
    }

    if (email === "mehedi@gmail.com" && password === "123456") {
      //history.push('/details');
      //alert("OK");
      navigate('/details', { state: { email, password } });
    }

    console.log("submit value", inputState);

  }

  return (
    <div id='Login'>
      <div className="wrapper">
        <h1>Sign In</h1>
        <p>Welcome back you've <br /> been missed!</p>
        <form>

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={setVal}
            value={inputState.email}
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