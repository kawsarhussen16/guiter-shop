const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		required: true,
		minlength: 5
	},
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	lastname: {
		type: String,
		required: true,
		maxlength: 100
	},
	cart: {
		type: Array,
		default: []
	},
	history: {
		type: Array,
		default: []
	},
	role: {
		type: Number,
		default: 0
	},
	token: {
		type: String
	}
});

userSchema.pre("save", function(next) {
	if (!this.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function(cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

	user.token = token;
	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
