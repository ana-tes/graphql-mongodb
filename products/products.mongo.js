const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  description: String,
  price: Number,
  reviews: [
    {
      rating: Number,
      comment: String,
    },
  ],
});

const products = mongoose.model('Product', productSchema);

module.exports = products;
