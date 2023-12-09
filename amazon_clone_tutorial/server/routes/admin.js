const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");

// Creating an Admin Midlleware
// Add Product
adminRouter.post("./admin/add-product", admin, async (red, res) => {
    try {
        const { name, description, images, quantity, price, category } = red.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category,
        });
        product = await product.save();
        res.json(product)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = adminRouter;