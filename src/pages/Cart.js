import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useFirebase } from "../context/Firebase";

const Cart = () => {
  const [userDetails, setUserDetails] = useState();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);

  const firebase = useFirebase();

  useEffect(() => {
    async function checkUserSignIn() {
      try {
        const user = await firebase.checkSignInDetails();
        if (user) {
          setUserDetails(user.email);
        } else {
          console.log("No user signed in");
        }
      } catch (error) {
        console.error("Error checking user sign-in", error);
      }
    }

    checkUserSignIn();
  }, []);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        // Check if userDetails is available and not empty
        if (userDetails) {
          setIsLoading(true);
          const apiUrl = `http://localhost:5000/cart?email=${userDetails}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setCartData(data);
        }
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setIsLoading(false);
      }
    }


    // Fetch cart products only if userDetails is available and not empty
    if (userDetails) {
      fetchCartProducts();
    }
  }, [userDetails]);

  useEffect(() => {
    function getTotalSum() {
      const sumdata = cartData.reduce((total, item) => total + item.price, 0);
      // The second argument to reduce (0) initializes the total to 0
  
      // Update the state with the calculated total sum
      setTotalAmt(sumdata);
    }
  
    getTotalSum();
  }, [cartData]);

  return (
    <div className="container" id="cart-page">
      <h1>Cart</h1>
      <div className="container">
      <div className="jumbotron">
        <h1>Your cart</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : cartData.length === 0 ? (
          <p>Your Shopping Cart is empty</p>
        ) : (
          <div className="container" id="cart-items">
            {cartData.map((item, index) => (
                <div class="card"  id="cart-item" key={index}>
                <div id="img-container">
                  <img
                    class="card-img-top"
                    src={item.image}
                    alt="Card image cap"
                    id="card-img"
                  ></img>
                </div>
                <div class="card-body">
                  <h3
                    class="card-text"
                    style={{ margin: "10px 0px 10px 0px" }}
                  >
                    {item.title}
                  </h3>
                  {/* <p class="list-group-item">{item.category}</p> */}
                </div>
                <ul class="list-group list-group-flush">
                  <h5 class="card-title">${item.price}</h5>
             
               
                </ul>
                <div class="card-body">
                
                </div>
              </div>
              
            ))}
          </div>
        )}
      </div>
      <div className="container" id="final-list">
              {cartData.map((e, index)=>(
                  <h5 key={index}>{e.title} x 1</h5>
              ))}
      </div>
      <h1>Total amount - ${totalAmt.toFixed(2)}</h1>
    </div>
    </div>
  );
};

export default Cart;
