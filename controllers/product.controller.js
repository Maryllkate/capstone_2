const product = require("../models/product.model")
const bcrypt = require("bcrypt-nodejs")
const auth = require("../auth")

module.exports.addProduct = async (req, res) => {
    try {
      const newProduct = new product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
      });
      await newProduct.save();
      res.status(200).json({ message: "Product created successfully" });
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(404).json({ message: "An error occurred while adding the product" });
    }
  };

module.exports.retrieveProducts = async (req, res) => {
    try {
      const retrieveProducts = await product.find();
      res.status(200).json(retrieveProducts);
    } catch (err) {
      res.status(404).json({ message: "An error occurred" });
    }
  };

module.exports.activeProducts = async (req, res) => {
    try {
      const activeProducts = await product.find({ isActive: true });
      res.status(200).json({activeProducts});
    } catch (err) {
      res.status(404).json({ message: "An error occurred" });
    }
  };

  module.exports.retrieveSingleProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const retrieveSingleProduct = await product.findById(productId);

      if(!product){
        return res.status(404).json({ message: "Product not found"})
      } 
      
      res.status(200).json(retrieveSingleProduct);
      
    } catch (err) {
      res.status(500).json({ message: "An error occured"});
    }
  }

  module.exports.updateProduct = async (req, res) => {
    try {
      const updateProduct = await product.findByIdAndUpdate(
        productId = req.params.productId,
        name = req.body.name,
        description = req.body.description,
        price = req.body.price
      );
      if (!updateProduct){
        return res.status(404).json({ message: "Product not found"})
      }

      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });

    } catch (err) {
      res.status(500).json({ message: "An error occured"});
    }
  }

  module.exports.archiveProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const archivedProduct = await product.findByIdAndUpdate(
        productId, {archived : true}
      )
      if(!archivedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product archived successfully", product: archivedProduct });

    } catch (err) {
      res.status(500).json({ message : "An error occured"});
    }
  }

  module.exports.activateProduct = async (req, res) => {
    try {
      const productId = req.params.productId;

    const activatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isArchived: false }
    );

    if (!activatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product activated successfully", product: activatedProduct });
  
    } catch (err) {
      res.status(500).json({ message : "An error occured"});
    }
  }

  module.exports.guestCheckout = async(req, res) => {
    try {
      const userId = req.user.id;
      const { products } = req.body;
  
      const orderProducts = [];
  
      for (const product of products) {
        const foundProduct = await Product.findById(product.productId);
  
        if (!foundProduct) {
          return res.status(404).json({ message: `Product not found: ${product.productId}` });
        }
  
        orderProducts.push({
          product: foundProduct._id,
          quantity: product.quantity,
        });
      }
  
      const newOrder = new Order({
        user: userId,
        products: orderProducts,
      });
  
      await newOrder.save();
      res.status(200).json({ message: "Order created successfully" });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: "An error occurred while creating the order" });
    }
  }
    
module.exports.retrieveUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDetails = {
      id: user._id,
      name: user.name,
      email: user.email,
    }

    res.status(200).json(userDetails);

  } catch(err){
    res.status(500).json({ message : "An error occured"});
  }
}