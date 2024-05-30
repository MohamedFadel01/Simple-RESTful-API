const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//get a specific product by id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//add a new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//update a product
app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, req.body);
    const updatedProduct = await Product.findById(id);

    if (!updatedProduct) {
      res
        .status(404)
        .json({ message: `Cannot find any product with this id: ${id}` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res
        .status(404)
        .json({ message: `Cannot find any product with this id: ${id}` });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://mohamed:spidermeow@cluster0.obvc3gq.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error(err));
