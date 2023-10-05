import React from "react";
import { useFirebase } from "../context/Firebase";

import { useState } from "react";
import "./LoginUser.css";
import Swal from "sweetalert2";



const LoginUser = () => {
  const firebase = useFirebase();
  const [loginState, setLoginState] = useState();

  document.title = "Login"

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");


  function emailHandler(e){
    let email_inp = e.target.value;
    setUserEmail(email_inp);

  }

  
  function passHandler(e){
    let pass_inp = e.target.value;
    setUserPass(pass_inp);

  }

  

  const loginUser = (e) =>{
    e.preventDefault();
    firebase.signinUserWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Logged in', user);
      setLoginState(userCredential);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged in Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
}
 
  return(
    <div id="login-container">
    <h1>Login</h1>
    <form onSubmit={loginUser}>

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={userEmail}
          onChange={emailHandler}
        />

      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          value={userPass}
          onChange={passHandler}
        />
      </div>
      <a href="/auth/sign-up">New user? Create account</a>
      <button type="submit" class="btn btn-primary" >
        Sign In 
      </button>
    </form>
  </div>

  )
  
};

export default LoginUser;
