const router = require("express").Router();
const { Brand } = require("../models/brand.model.js");
const { admin } = require("../middleware/admin.js");
const { auth } = require("../middleware/auth.js");

router.post("/brand", auth, admin, (req, res) => {
	const brand = new Brand(req.body);
	brand.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		res.status(200).json({
			success: true,
			brand: doc
		});
	});
});

router.get("/brands", (req, res) => {
	Brand.find({}, (err, brands) => {
		if (err) return res.status(400).send(err);
		res.status(200).send(brands);
	});
});

module.exports = router;
