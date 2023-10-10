import React from "react";
import { useEffect, useState } from "react";
import "./Checkout.css";
import { useFirebase } from "../context/Firebase";


const Checkout = () => {
  const [userDetails, setUserDetails] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_no, setZipNo] = useState("");
  const firebase = useFirebase();

  const [res, setRes] = useState("");

  const [userEmail, setUserEmail] = useState("")

  async function checkUserSignIn(){
    try{
      const user = await firebase.checkSignInDetails();
      if(user){
        setUserDetails(user);
        console.log(user.email + " is signed in ");

      }
      else{
        console.log("No user signed in");
      }
    } catch (error){
      console.error('Error checking user sign-in', error);
    }
  }

  
  useEffect(()=>{
    checkUserSignIn();
  },[])

  useEffect(()=>{
    async function checkAddress(){
      try{
        const res = await fetch("http://localhost:5000/api/addressdetails",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        })
        if(res.status == 200){
          const f_data = await res.json();
          setUserEmail(f_data);
        }
        else{
          console.log("Something went wrong");
        }
      }catch(err){
        console.log(err);
      }
     }
     checkAddress();
  },[])


console.log(userEmail);

  async  function addAddressHandler(e){
    e.preventDefault();

    const userAddressDetails = {
      user_email: userDetails.email,
      address: address,
      city: city,
      state: state,
      zip_no: zip_no
    } 

    try{
      const response = await fetch(`http://localhost:5000/api/addressdetails`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAddressDetails),
      })
      if(response.status == 200){
        const fetched_data = await response.json();
        setRes(fetched_data);
        console.log("Done");
        window.location.href = "/api/place_order"
      }
      else{
        console.log("Something went wrong ");
      }
    }catch(err){
      console.log(err);
    }
    
  
  }



  return (
    <div className="container" id="checkout-container">
      <div id="checkout-title">
      <h1>Add Address</h1>
      </div>

      <form class="row g-3">
      
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            onChange={(e)=>setAddress(e.target.value)}
            required
          />
        </div>
    
        <div class="col-md-6">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input  type="text" class="form-control" id="inputCity" onChange={(e)=>setCity(e.target.value)} required/>
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">
            State
          </label>
   
          <input type="text" class="form-control" id="inputState" onChange={(e)=>setState(e.target.value)} required />
    
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">
            Zip
          </label>
          <input  type="text" class="form-control" id="inputZip" onChange={(e)=>setZipNo(e.target.value)} required/>
        </div>

        <div class="col-12"> 
          <button id="deliver_btn" type="submit" class="btn btn-primary" onClick={addAddressHandler}>
            Deliver to this address
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
