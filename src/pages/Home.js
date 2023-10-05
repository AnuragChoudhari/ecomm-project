import React from "react";
import "./Home.css";

import {getDatabase, ref, set, get} from "firebase/database"
import {app} from "../firebase";

const db = getDatabase(app);

const Home = () => {

  document.title = "Home"

  const putData = () =>{
    set(ref(db, 'users/test_user'),{
      id: 1,
      name: "test_user",
      age: 200
    })
  }


  return (
    <div className="container" id="home_container">
      <h1>Welcome to our ecommerce website</h1>

      <div className="container" id="hero-section">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default Home;
