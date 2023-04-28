const {
  getAllOrders,
  createNewOrder,
  getOrderById,
  deleteOrder,
} = require('./orders.model');

module.exports = {
  Query: {
    orders: () => {
      return getAllOrders();
    },
    getOrderById: (_, args) => {
      const { _id } = args;
      return getOrderById(_id);
    },
  },
  Mutation: {
    createOrder: (_, args) => {
      const { items } = args;
      return createNewOrder(items);
    },
    deleteOrder: (_, args) => {
      const { _id } = args;
      return deleteOrder(_id);
    },
  },
};
