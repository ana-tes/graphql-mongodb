const {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
  deleteProduct,
} = require('./products.model');

module.exports = {
  Query: {
    products: () => {
      return getAllProducts();
    },
    productsByPrice: (_, args) => {
      const { min, max } = args;
      return getProductsByPrice(min, max);
    },
    product: (_, args) => {
      const { _id } = args;
      return getProductById(_id);
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      const { description, price, name, brand } = args.productInput;
      return addNewProduct(description, price, name, brand);
    },
    addNewProductReview: (_, args) => {
      const {
        _id,
        productReviewInput: { rating, comment },
      } = args;

      return addNewProductReview(_id, rating, comment);
    },
    deleteProduct: (_, args) => {
      const { _id } = args;
      return deleteProduct(_id);
    },
  },
};
