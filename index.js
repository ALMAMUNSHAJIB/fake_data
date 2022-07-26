const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const faker = require("faker");
const dotenv = require('dotenv');
const dummyUserRoutes = require('./routes/dummy-user');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
dotenv.config({path: path.resolve(`${__dirname}/config/.env.${process.env.NODE_ENV}`)});


mongoose.connect(process.env.DB_NAME).then(() => console.log(`Database connected with ${process.env.DB_NAME}`)).catch((err) => console.log(err));
app.use("/api", dummyUserRoutes);
app.use("/api", userRoutes);

var port = process.env.APP_PORT || 4000;
app.listen(port, () => console.log("server running at port " + port));