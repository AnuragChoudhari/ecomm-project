const axios = require('axios');
const { MongoClient } = require('mongodb');

// Replace with your API URL
const apiUrl = 'https://fakestoreapi.com/products';
const dbName = 'ecom-project';
const collectionName = 'products';

// Function to fetch data from the API
async function fetchDataFromAPI() {
  try {
    const response = await axios.get(apiUrl);
    return response.data; // Assuming the API response is an array of product objects
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
}

// Function to insert data into MongoDB
async function insertDataIntoMongoDB(data) {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert each product into the collection
    await collection.insertMany(data);

    console.log('Data inserted into MongoDB successfully.');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  } finally {
    client.close();
  }
}

// Main function to fetch data and insert into MongoDB
async function main() {
  try {
    const data = await fetchDataFromAPI();
    await insertDataIntoMongoDB(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
