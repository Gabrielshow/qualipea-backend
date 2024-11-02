const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/admin/login", async(req, res) => {
    const { email, password } = req.body;

    const UserData = {
        email: email,
        passowrd: password
    }
});

app.post("/admin/signin", async(req, res) => {
    
})

