const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require('./schema/userSchema'); // Make sure to import your User model
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const MONGOURI = process.env.MONGO; // Use a strong secret key for JWT

const connectToDb = async () => {
    try {
        await mongoose.connect( MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach user to request
        next();
    });
};

app.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/admin/signin", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Example protected route
// app.get("/admin/protected", authenticateToken, (req, res) => {
//     res.status(200).json({ message: "This is a protected route", user: req.user });
// });

// Start the server and connect to the database
const startServer = async () => {
    await connectToDb();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};

startServer();
