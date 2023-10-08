import React from "react";
import { useEffect, useState } from "react";
import "./Checkout.css";
import { useFirebase } from "../context/Firebase";

const Checkout = () => {
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
          />
        </div>
    
        <div class="col-md-6">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input type="text" class="form-control" id="inputCity" />
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">
            State
          </label>
   
          <input type="text" class="form-control" id="inputState" />
    
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">
            Zip
          </label>
          <input type="text" class="form-control" id="inputZip" />
        </div>

        <div class="col-12"> 
          <button id="deliver_btn" type="submit" class="btn btn-primary">
            Deliver to this address
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
