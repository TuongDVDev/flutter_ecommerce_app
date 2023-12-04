const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();

// authRouter.get("/user", (req, res) => {
//     res.json({ msg: "tuong" });
// });

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with same email already exists!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name,
        })
        user = await user.save();
        res.json(user);
        // String -> Object
        // 200
        // Weak-password - 6 characters, same-account-with-email
        // {
        // 'name': name, 'email': email, 'password': password
        // }
        // get the data from client 
        // post that data in database 
        // return that data to the user 
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = authRouter;