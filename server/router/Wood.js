const router = require("express").Router();
const { Wood } = require("../models/wood.model.js");
const { admin } = require("../middleware/admin.js");
const { auth } = require("../middleware/auth.js");

router.post("/wood", auth, admin, (req, res) => {
	const wood = new Wood(req.body);
	wood.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		res.status(200).json({
			success: true,
			wood: doc
		});
	});
});

router.get("/woods", (req, res) => {
	Wood.find({}, (err, woods) => {
		if (err) return res.status(400).send(err);
		res.status(200).send(woods);
	});
});

module.exports = router;
