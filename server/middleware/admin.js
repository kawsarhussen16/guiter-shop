let admin = (req, res, next) => {
	if (req.user.role === 0) {
		return res.send(
			"You are not allowed, only admin is permitted for this request."
		);
	}
	next();
};

module.exports = { admin };
