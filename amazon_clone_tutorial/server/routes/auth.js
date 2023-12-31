const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

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

// SIGN IN ROUTE
// Exercise 1
authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not exist!" });
        }
        // gibberish
        const isMath = await bcryptjs.compare(password, user.password);
        if (!isMath) {
            return res.status(400).json({ msg: "Incorrect password!" });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
        // {
        //     "token": "tokensomething"
        //     "name": "Ngoc", 
        //     "email": "Ngoc12@gmail.com",
        //     "password": "ngoc123"
        //   }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// tokenIsValid
authRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get user data
authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
})

module.exports = authRouter;