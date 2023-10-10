import React from 'react'
import "./PlaceOrder.css"
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";


const PlaceOrder = () => {
    const [userDetails, setUserDetails] = useState();
 const firebase = useFirebase();

 useEffect(()=>{
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
      checkUserSignIn();
 },[])

  return (
    <div>PlaceOrder</div>
  )
}

export default PlaceOrder