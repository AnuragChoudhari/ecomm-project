import React from "react";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Navbar.css";




const Navbar = () => {
  const [userDetails, setUserDetails] = useState();

  const firebase = useFirebase();

  async function checkUserSignIn(){
    try{
      const user = await firebase.checkSignInDetails();
      if(user){
        setUserDetails(user.email);
        console.log(user.email + " is signed in ");

      }
      else{
        console.log("No user signed in");
      }
    } catch (error){
      console.error('Error checking user sign-in', error);
    }
  }

  


  function logoutUser(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(()=>{
          firebase.logOutUser();
          console.log("Logout Successfull");
          window.location.reload();
        },2000)
        Swal.fire(
          'Logged Out',
          '',
          'success'
        )
      }
    })
  }

  useEffect(()=>{
    checkUserSignIn();
  },[ ])

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">
            Shopping Website
          </a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/products">
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">
                Contact
              </a>
            </li>
            {userDetails ? (
              <li class="nav-item">
                <a class="nav-link" href="/user/orders">
                  Orders
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>window.location.href = "/products"}>
              Search
            </button>
          </form>
          <ul class="navbar-nav mt-2 mt-lg-0" id="right-side">
            <li class="nav-item active">
              {userDetails ? (
                <a class="nav-link" href="/" onClick={logoutUser}>
                  Log out
                </a>
              ) : (
                <a class="nav-link" href="/auth/login">
                  Log in
                </a>
              )}
            </li>
            {userDetails ? (
              <></>
            ) : (
              <li class="nav-item">
                <a class="nav-link" href="/auth/sign-up">
                  Sign up
                </a>
              </li>
            )}
            {userDetails?<li className="nav-item">{userDetails}</li>:<></>}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
