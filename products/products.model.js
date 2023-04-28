const axios = require('axios');

const productModel = require('./products.mongo');

const API_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

async function populateProducts() {
  console.log('Downloading products data...');
  const response = await axios.get(API_URL);

  if (response.status !== 200) {
    console.log('Problem downloading products data');
  }

  const productsDocs = response.data;

  for (const productDoc of productsDocs) {
    const product = {
      brand: productDoc['brand'],
      name: productDoc['name'],
      description: productDoc['description'],
      price: productDoc['price'],
      reviews: [],
    };

    console.log(`Saving ${product.name} product`);
    await saveProduct(product);
  }
}

async function saveProduct(product) {
  const newProduct = new productModel(product);
  const savedProduct = await newProduct.save();
  return savedProduct._doc;
}

async function getAllProducts() {
  return await productModel.find({});
}

async function getProductsByPrice(min, max) {
  return await productModel.find({ price: { $gte: min, $lte: max } });
}

async function getProductById(_id) {
  return productModel.findById(_id);
}

async function addNewProduct(description, price, name, brand) {
  const newProduct = {
    description,
    price,
    name,
    brand,
    reviews: [],
  };

  return await saveProduct(newProduct);
}

async function addNewProductReview(_id, rating, comment) {
  const machedProduct = await getProductById(_id);

  if (machedProduct) {
    const newReview = {
      rating,
      comment,
    };

    machedProduct.reviews.push(newReview);

    return await machedProduct.save();
  }
}

async function loadProductsData() {
  const firstProduct = await findProduct({
    brand: 'colourpop',
    name: 'Lippie Pencil',
    price: 5,
  });

  if (firstProduct) {
    console.log('Products data already loaded');
  } else {
    await populateProducts();
  }
}

async function findProduct(filter) {
  return await productModel.findOne(filter);
}

async function deleteProduct(_id) {
  const wasDeleted = (await productModel.deleteOne({ _id })).deletedCount;
  return wasDeleted;
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
  loadProductsData,
  deleteProduct,
};
