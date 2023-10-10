  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const { Int32 } = require('mongodb');

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self' data:"); // Allow data URIs
    next();
  }); 


  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/ecom-project', { useNewUrlParser: true, useUnifiedTopology: true });


  const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    // Add other fields as needed
  });

  const cartSchema = new mongoose.Schema({
    user_email: String,
    products: [Number], // An array of product IDs as strings
  });
  

  const userAddress = new mongoose.Schema({
    user_email: String,
    address: Object,
  
  })

  const ProductModel = mongoose.model('Product', ProductSchema);

  // Create a model for the cart_info collection
  const Cart = mongoose.model('Cart', cartSchema);

  // address
  
  const User_Address = mongoose.model('User_Address', userAddress);



  // Define an API route to fetch products
  app.get('/api/products', async (req, res) => {
    try {
      // Fetch all products from the "products" collection
      const products = await ProductModel.find();

      // Send the products as JSON in the response
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Define an API route to fetch products
  app.get('/api/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId; // Get dynamic route parameter

      const product_with_id = await ProductModel.findOne({id: parseInt(productId)});
      
    console.log(productId);
    console.log(product_with_id);


    res.json(product_with_id);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Define a route to handle the incoming JSON data
  app.post('/api/addToCart', async (req, res) => {
    try {
      const { user_email, product_details } = req.body; // Destructure the data

      
      
      const emailId =  await Cart.findOne({user_email: user_email});
      

      if(emailId == null){
        const cartEntry = new Cart({
          user_email,
          products: parseInt(product_details), // Assuming product_details is an array of product IDs as strings
        });
        
        await cartEntry.save();
      } else{
        const updated_data = await Cart.updateOne({user_email: user_email}, {$push: {products: product_details}})
        
      }

      console.log(emailId);

      res.json({ message: 'Data received successfully' });
    

    } catch (error) {
      console.error('Error processing JSON data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Display Cart Products

  app.get("/cart", async (req, res) => {
    const userEmail = req.query.email; // Retrieve the email from the query parameter

    try {
      const getProducts = await Cart.findOne({ user_email: userEmail });

      if (getProducts == null) {
        // Handle the case where the user's cart is empty
        res.json({ message: "Your cart is empty" });
      } else {
        // Fetch products from the database based on product IDs in the cart
        const fetchProducts = await ProductModel.find({ id: { $in: getProducts.products } });

        res.json(fetchProducts);
      }
    } catch (err) {
      console.log("Error fetching cart products", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Add address

  app.post("/api/addressdetails", async (req,res)=>{
      const userData = req.body;


      

        
        const checkAddressExists = await User_Address.findOne({user_email: userData.user_email});
        
        if(checkAddressExists == null){
          const addAddress = new User_Address({
            user_email: userData.user_email,
            address: userData, // Assuming product_details is an array of product IDs as strings
          });
          
          await addAddress.save();
          res.send(addAddress);
        }
        else{
          res.send("Address already exists");
        }
     
      
      
  })

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
