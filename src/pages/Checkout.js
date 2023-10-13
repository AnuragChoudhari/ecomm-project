import React from "react";
import { useEffect, useState } from "react";
import "./Checkout.css";
import { useFirebase } from "../context/Firebase";
import Swal from "sweetalert2";

const Checkout = () => {
  
  const [userDetails, setUserDetails] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_no, setZipNo] = useState("");
  const firebase = useFirebase();
  const [cartData, setCartData] = useState([]);
  const [res, setRes] = useState("");

  const [userEmail, setUserEmail] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  async function checkUserSignIn() {
    try {
      const user = await firebase.checkSignInDetails();
      if (user) {
        setUserDetails(user);
        console.log(user.email + " is signed in ");
      } else {
        console.log("No user signed in");
      }
    } catch (error) {
      console.error("Error checking user sign-in", error);
    }
  }

  useEffect(() => {
    checkUserSignIn();

  }, []);


  useEffect(() => {

    async function checkAddress() {
      try {
        const res = await fetch("http://localhost:5000/api/getAddress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });
        if (res.status == 200) {
          const f_data = await res.json();
          setUserEmail(f_data);
          
        } else {
          console.log("Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
      
    }
    checkAddress();
    
  }, [userDetails]);


// Cart details

async function getCartdata() {
  if (userDetails) {
    try {
      const apiUrl = `http://localhost:5000/cart?email=${userDetails.email}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setCartData(data);
      } else {
        console.error('Failed to fetch cart data');
        // Handle the error, e.g., display an error message
      }
    } catch (error) {
      console.error('Error while fetching cart data:', error);
      // Handle the error, e.g., display an error message
    }
  }
}

useEffect(() => {
  checkUserSignIn().then(() => {
    if (userDetails) {
      getCartdata().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  });
}, []);

  console.log(cartData);

  
  console.log(Object.keys(userEmail).length);

  async function addAddressHandler(e) {
    e.preventDefault();

    const userAddressDetails = {
      user_email: userDetails.email,
      address: address,
      city: city,
      state: state,
      zip_no: zip_no,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/addressdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAddressDetails),
      });
      if (response.status == 200) {
        const fetched_data = await response.json();
        setRes(fetched_data);
        console.log("Done");
     
      } else {
        console.log("Something went wrong ");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  async function placeOrder(e){
    e.preventDefault();
   
    Swal.fire({
      title: 'Place Order',
      text: "Confirm your order",
      html: cartData.map((item, i) => `
          <div id="modal-msg">
        <p>${item.title} x 1</p>
        </div>
    `),

      showCancelButton: true,
      confirmButtonColor: '#04aa6d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
      }
    })
  }


  return (
    <div className="container" id="checkout-container">
      <form class="row g-3">
        {Object.keys(userEmail).length == 0 ? (
          <>
            <div id="checkout-title">
              <h1>Add Address</h1>
            </div>

            <div class="col-12">
              <label for="inputAddress" class="form-label">
                Address
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div class="col-md-6">
              <label for="inputCity" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">
                State
              </label>

              <input
                type="text"
                class="form-control"
                id="inputState"
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div class="col-md-2">
              <label for="inputZip" class="form-label">
                Zip
              </label>
              <input
                type="text"
                class="form-control"
                id="inputZip"
                onChange={(e) => setZipNo(e.target.value)}
                required
              />
            </div>

            <div class="col-12">
              <button
                id="deliver_btn"
                type="submit"
                class="btn btn-primary"
                onClick={addAddressHandler}
              >
                Add Address
              </button>
            </div>
          </>
        ) : (
          <>
            <div class="container">
              <div class="jumbotron">
                <h1>Your addresses</h1>
                <p>{userEmail.address.address}</p>
                <p>
                  {userEmail.address.state +
                    ", " +
                    userEmail.address.city +
                    ", " +
                    userEmail.address.zip_no}
                </p>
              </div>
              <button id="placeorder_btn" type="submit" class="btn btn-primary" onClick={placeOrder}>
                PlaceOrder
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Checkout;
