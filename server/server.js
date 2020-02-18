const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./router/User.js");
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

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
