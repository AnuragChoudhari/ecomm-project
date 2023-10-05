import React from "react";
import { useFirebase } from "../context/Firebase";
import { useState } from "react";
import "./Signup.css"
import Swal from "sweetalert2";





const Signup = () => {
  const firebase = useFirebase();


  document.title = "Signup";
  
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
 const signupUser =   async(e) => {
    
    e.preventDefault();
    const res = await firebase.signupUserWithEmailAndPassword(userEmail, userPass);
    const res2 = await firebase.logOutUser();
    const data2 = res2;
    const data = res;
    console.log(data);
    console.log(data2);
    window.location.href = "/auth/login";
  }
  
  return (
    <div id="signup-container">
      <h1>Sign up </h1>
      <form onSubmit={signupUser}>
        <div class="form-group">
          <label >Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={userEmail}
            onChange={emailHandler}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label >Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            value={userPass}
            onChange={passHandler}
          />
        </div>
        <a href="/auth/login">Already have an account? Log in</a>
        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
