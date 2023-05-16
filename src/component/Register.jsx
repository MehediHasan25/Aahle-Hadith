import React, { useState } from 'react'
import '../css/Register.css';
import { Link } from 'react-router-dom';


const Register = () => {
    const [inputState, setInputState] = useState({
        name: '',
        email: '',
        password: "",
        conPass: ""
      });
    
      const setVal = (e) => {
        //e.preventDefult();
        // console.log("name", e.target.name);
        // console.log("val", e.target.value);
    
        const {name,value} = e.target;
    
        setInputState((prev)=>{
          console.log('prevVal', prev);
          return {
            ...prev,
            [name]:value
          }
        })
      }
    
      const handleSubmit =(e) =>{
        //console.log("submit",data);
        e.preventDefault();
        const {name,email,password,conPass} = inputState;
    
        if(name === ""){
          alert("Please Enter Username");
          return;
        }
    
        if(email === ""){
          alert("Please Enter Email");
          return;
        }
    
    
        if(password === ""){
          alert("Please Enter the Password");
          return;
        }
    
        if(password !== conPass){
          alert('Password and Confirm Password are not same');
          return;
        }
    
        console.log("submit value", inputState);
        
      }
    
      return (
        <div id="Register">
        <div className="wrapperRegister">
          <h1>Sign Up</h1>
          <form>
            <input
              type="text"
              placeholder="Enter username"
              name="name"
              onChange={setVal}
              value={inputState.name}
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
          <button onClick={(e)=>handleSubmit(e)}>Sign UP</button>
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