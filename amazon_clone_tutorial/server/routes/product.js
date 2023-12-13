const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../models/product");

// /api/products?category=Essentials
// /api/amazon?theme=dart

// /api/product:category=Essentials
productRouter.get("/api/products/", auth, async (req, res) => {
    try {
        const products = await Product.find({ category: req.query.category });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Create a get request to search products and get them
// /api/products/search/s
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
    try {
        const products = await Product.find({
            name: { $regex: req.params.name, $options: "s" },
        });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = productRouter;