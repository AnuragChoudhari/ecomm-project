import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductView.css";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import { app } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";

const ProductView = () => {
  const auth = getAuth(app);
  const [userDetails, setUserDetails] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUserDetails(user);
      // ...
      console.log("User Signed in");
    } else {
      // User is signed out
      // ...
      console.log("No user Signed in")
    }
  });

  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null); // Initialize to null

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } 
        const prod_data = await res.json();
        setProductDetails(prod_data);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, [id]); // Include 'id' in the dependency array to re-fetch when 'id' changes

  // Check if productDetails is not null before rendering
  if (!productDetails) {
    return <div>No product found with Id</div>;
  } 
  
  function checkLogin(){
    if(userDetails){
        console.log("User is logged in ");

        return true;
    }
    else{
      alert("Please login first");
      return false;
    }
  }

// Cart functionality
  function cartHandler(){
    let res = checkLogin();
    if(res){
      console.log("Can be added to cart");
   
    }
    else{
      console.log("Cannot be added");
  
    }
  }




  return (
    <div className="container" id="product-view">
      <h1>  </h1>

      <div className="container" id="product-details">
        <div className="container" id="image-container">
          <img src={productDetails.image} alt={productDetails.title} height="500px" id="product-image" />
        </div>
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title">${productDetails.price}</h5>
            <p className="card-text">{productDetails.title}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{productDetails.description}</li>
            <li className="list-group-item">{productDetails.rating.rate}</li>
            <li className="list-group-item">{productDetails.category}</li>
          </ul>
          <div className="card-body">
          <button value="login" id="buy" type="button" class="btn btn-primary btn-sm" onClick={checkLogin}>Buy Now</button> 
          &nbsp;&nbsp;<button value="addtocart" id="addtocart" type="button" class="btn btn-primary btn-sm" onClick={cartHandler}> Add to cart </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
