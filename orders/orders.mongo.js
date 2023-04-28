const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: Date,
  subtotal: Number,
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
});

const orders = mongoose.model('Order', orderSchema);

module.exports = orders;
