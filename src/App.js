import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ProductView from "./pages/ProductView";
import Signup from "./pages/Signup";
import LoginUser from "./pages/LoginUser";
import ErrPage from "./pages/ErrPage";
 
import { useFirebase } from "./context/Firebase";
import { useState, useEffect } from "react";
import  Cart  from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  const [userDetails, setUserDetails] = useState();
  const firebase = useFirebase();
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

if(userDetails){
  console.log("True");
}
else{
  console.log("False");
}

  return (
    <div>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path="/products/viewproduct/:id" element={<ProductView></ProductView>}></Route>
          {userDetails ? <><Route path="/cart" element={<Cart></Cart>}></Route> <Route path="/checkout" element={<Checkout></Checkout>}></Route></>
          :     <>  <Route path="/auth/sign-up" element={<Signup></Signup>}></Route>
          <Route path="/auth/login" element={<LoginUser></LoginUser>}></Route>  </>}
          <Route path="/contact" element={<Contact></Contact>}></Route>

        
          <Route path="*" element={<ErrPage></ErrPage>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
};

export default App;
