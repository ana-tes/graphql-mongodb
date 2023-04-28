const orderModel = require('./orders.mongo');
const { getProductById } = require('../products/products.model');

async function getAllOrders() {
  return await orderModel.find({}).populate('items.product');
}

async function getOrderById(_id) {
  return await orderModel.findById(_id).populate('items.product');
}

async function createNewOrder(items) {
  const date = new Date();
  const orderData = {
    date,
    items: [],
  };

  let subtotal = 0;
  for (let item of items) {
    const { productId, quantity } = item;

    const { price } = await getProductById(productId);

    const totalPrice = price * quantity;
    subtotal += totalPrice;

    const newItem = {
      product: productId,
      quantity,
    };

    orderData.items.push(newItem);
  }

  orderData.subtotal = subtotal;

  const newOrder = new orderModel(orderData);
  const { _id: savedOrderId } = (await newOrder.save())._doc;
  return await getOrderById(savedOrderId);
}

async function deleteOrder(_id) {
  const wasDeleted = (await orderModel.deleteOne({ _id })).deletedCount;
  return wasDeleted;
}

module.exports = {
  getAllOrders,
  createNewOrder,
  getOrderById,
  deleteOrder,
};
