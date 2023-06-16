const jwt = require('jsonwebtoken');
require('dotenv').config()
const authorize = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Unauthorized' });
	} else {
		try {
			console.log(process.env.SECRET)
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.SECRET);
			console.log(decoded);
			req.user = decoded;
			next();
		} catch (error) {
			console.log(error);
			return res.status(401).json({ message: 'Unauthorized' });
		}
	}
};
module.exports = {authorize};