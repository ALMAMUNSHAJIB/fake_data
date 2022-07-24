const express = require('express');
const mongoose = require('mongoose');
const faker = require("faker");
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/fakerdb').then(() => console.log('Database')).catch((err) => console.log(err));
app.use("/api", userRoutes)

var port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running at port " + port));