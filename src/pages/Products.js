import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Products = () => {
  document.title = "Products";

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProductsData(data);
    }
    getData();
  }, []);

  console.log(productsData);

  return (
    <div className="container" id="products-page">
      <div id="product-filter-section">

        
      </div>

      <div className="container" id="product-display-section">
        <h1>Products</h1>
        <div className="container" id="products-container">
          {productsData.map((elm) => {
            return (
              <>
                <div class="card" style={{ width: "18rem" }} id={elm["id"]}>
                  <div id="img-container">
                    <img
                      class="card-img-top"
                      src={elm["image"]}
                      alt="Card image cap"
                      id="card-img"
                    ></img>
                  </div>
                  <div class="card-body">
                    <h3
                      class="card-text"
                      style={{ margin: "10px 0px 10px 0px" }}
                    >
                      {elm["title"]}
                    </h3>
                    <h5 class="card-title">${elm["price"]}</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{elm["description"]}</li>
                    <li class="list-group-item">
                      Rating: {elm["rating"]["rate"]}
                    </li>
                    <li class="list-group-item">{elm["category"]}</li>
                  </ul>
                  <div class="card-body">
                    <Link to={`/products/viewproduct/${elm["id"]}`}>
                      View Product
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
