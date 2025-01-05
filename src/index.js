// index.js
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes
const { authenticateUser } = require('./middleware/authMiddleware'); // Import the authentication middleware

dotenv.config();

const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const MONGOURI = process.env.MONGO;

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Use user routes for user-related endpoints
app.use('/admin', userRoutes);

app.use('/uploads', express.static('uploads'));


// Use blog routes for blog-related endpoints
app.use('/api', authenticateUser, blogRoutes);

// Start the server and connect to the database
const startServer = async () => {
    await connectToDb();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};

startServer();
