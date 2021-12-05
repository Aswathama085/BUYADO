const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDeatils,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controllers/productController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDeatils);

router.route("/review").put(isAuthenticateUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteReviews);

module.exports = router;
