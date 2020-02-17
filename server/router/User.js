const router = require("express").Router();
const { User } = require("../models/user.model.js");

router.post("/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		res.status(200).json({
			success: true,
			userdata: doc
		});
	});
});
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: "Auth Failed, email not found"
			});
		user.comparePassword(password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					loginSuccess: false,
					message: "Wrong password"
				});
		});
		user.generateToken((err, user) => {
			if (err) return res.status(400).send(err);
			res.cookie("w_auth", user.token)
				.status(200)
				.json({
					loginSuccess: true
				});
		});
	});
});
module.exports = router;
