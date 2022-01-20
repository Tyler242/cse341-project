//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const fetch = require('node-fetch');
const url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

// this will contain the product objects we receive from the API
const productsList = [];

function toJson(response) {
  /* we will receive the data from the API and convert it to JSON */
  if (response.ok) {
    return response.json();
  } else {
    console.log('error', response);
  }
}

function createProducts(data) {
  /* for each object recieved from the API, we will create a new
  Product object and add it to the productsList array */

  data.forEach((data) => {
    // push the new product to the array
    productsList.push(
      // create new product
      new Product(
        data.name,
        data.price,
        data.description,
        data.imageUrl,
        data.tags
      )
    );
  });
}

router.get('/', (req, res, next) => {
  fetch(url) // fetch the data
    .then(toJson) // convert it to JSON
    .then(createProducts) // create the Prodcut objects
    .then(
      // render the page
      res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        products: productsList,
      })
    );
});

router.post('/', (req, res, next) => {
  /* create a new list of products that contain 
  the word in the name */
  const word = req.body.search;
  const filteredProducts = productsList.filter((product) =>
    product.name.includes(word)
  );
  res.render('pages/ta03', {
    title: 'Team Activity 03',
    path: '/ta03', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    products: filteredProducts,
  });
});

module.exports = router;
