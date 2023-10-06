import React from "react";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Navbar.css";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState();

  const firebase = useFirebase();

  async function checkUserSignIn() {
    try {
      const user = await firebase.checkSignInDetails();
      if (user) {
        setUserDetails(user.email);
        console.log(user.email + " is signed in ");
      } else {
        console.log("No user signed in");
      }
    } catch (error) {
      console.error("Error checking user sign-in", error);
    }
  }

  function logoutUser(e) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          firebase.logOutUser();
          console.log("Logout Successfull");
          if (window.location.href == window.location.origin + "/cart") {
            window.location.href = "/";
            window.location.reload();
          } else {
            window.location.reload();
          }
        }, 2000);
        Swal.fire("Logged Out", "", "success");
      }
    });
  }


  // Cart Handler

  async function cartHandler() {
    // const userEmail = userDetails;
    // const apiUrl = `http://localhost:5000/cart?email=${userEmail}`;

    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response from the server, which may contain specific details
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    window.location.href = "/cart";
  } 

  useEffect(()=>{
    checkUserSignIn();
  },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            Shopping Website
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            {userDetails ? (
              <li className="nav-item">
                <a className="nav-link" href="/user/orders">
                  Orders
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => (window.location.href = "/products")}
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav mt-2 mt-lg-0" id="right-side">
            <li className="nav-item active">
              {userDetails ? (
                <a className="nav-link" href="/" onClick={logoutUser}>
                  Log out
                </a>
              ) : (
                <a className="nav-link" href="/auth/login">
                  Log in
                </a>
              )}
            </li>
            {userDetails ? (
              <></>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/auth/sign-up">
                  Sign up
                </a>
              </li>
            )}
            {userDetails ? <li className="nav-item">{userDetails}</li> : <></>}
            <li className="nav-item">
              <button id="cart-btn" className="nav-link" onClick={cartHandler}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
