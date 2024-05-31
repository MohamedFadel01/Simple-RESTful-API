const express = require("express");
const productRouter = express.Router();

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//get all products
productRouter.get("/", getProducts);

//get a specific product by id
productRouter.get("/:id", getProductById);

//add a new product
productRouter.post("/", addProduct);

//update a product
productRouter.put("/:id", updateProduct);

//delete a product
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
