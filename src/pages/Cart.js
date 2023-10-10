import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useFirebase } from "../context/Firebase";
import Swal from "sweetalert2";
const Cart = () => {
  const [userDetails, setUserDetails] = useState();
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);

  const firebase = useFirebase();
  const [delStatus, setDelstatus] = useState(false);
  const [delData, setDelData] = useState();

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


  
  async function deleteHandler(e){


    if(e.target.id >= 2){
      const deleteData = {
        user_email: userDetails,
        prod_id: e.target.id
      }
  
      const res = await fetch("http://localhost:5000/api/remove",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
      })
  
      const del_data = await res.json();
      
      setDelData(del_data);
      setDelstatus(delStatus == false ? true : false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item Removed',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{

      alert("No items to delete");
    }
  }

  
  useEffect(() => {
    async function fetchCartProducts() {
      try {
        // Check if userDetails is available and not empty
        if (userDetails) {
          setIsLoading(true);
          const apiUrl = `http://localhost:5000/cart?email=${userDetails}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data != null) {
            setCartData(data);
          } else {
            setCartData(null);
          }
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
  }, [userDetails, delStatus]);

  useEffect(() => {
    function getTotalSum() {
      const sumdata = cartData.reduce((total, item) => total + item.price, 0);
      // The second argument to reduce (0) initializes the total to 0

      // Update the state with the calculated total sum
      setTotalAmt(sumdata);
    }

    if(cartData.length > 0){
      getTotalSum();
    }
  }, [cartData, delStatus]);



  function checkOutHandler() {
    window.location.href = "/checkout";
  }

  console.log(cartData.length)
  console.log(delData);

  return (
    <div className="container" id="cart-page">
      <h1>Cart</h1>
      {cartData.length == 0 ? (
        <h1> Your cart is empty </h1>
      ) : (
        <>
          <div className="container">
            <div className="jumbotron">
              <h1>Your cart</h1>

              <div className="container" id="cart-items">
                {cartData.map((item, index) => (
                  <div class="card" id="cart-item" key={index}>
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
                    </div>
                    <ul class="list-group list-group-flush">
                      <h5 class="card-title">${item.price}</h5>
                    </ul>
                    <div class="card-body"></div>
                    <button className="btn btn-danger" key={index} id={item.id} onClick={deleteHandler}>Remove Item</button>
                  </div>
                  
                ))}
              </div>
            </div>
            { cartData.length == 0 ? <></> : 
            <>
            <div className="container" id="final-list">
              {cartData.map((e, index) => (
                <h5 key={index}>{e.title} x 1</h5>
              ))}
            </div>
            <h1>Total amount - ${totalAmt.toFixed(2)}</h1>
            <button className="btn btn-primary" onClick={checkOutHandler}>
              Proceed to checkout
            </button>

            </> }
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
