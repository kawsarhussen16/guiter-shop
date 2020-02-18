const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./router/User.js");
const Brand = require("./router/Brand.js");
const Wood = require("./router/Wood.js");
const Product = require("./router/Product.js");
require("dotenv").config();

const app = express();

mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("Db connected"))
	.catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//=================================
app.use("/api/users", User);
//=================================

//=================================
app.use("/api/product", Brand);
//=================================
//=================================
app.use("/api/product", Wood);
//=================================
//=================================
app.use("/api/product", Product);
//=================================

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
