const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const Realtime = require('../services/socket.service');
router.post('/', async (req, res) => {
	try {
		const connection = Realtime.connection();
		connection.sendEvent('SEND', req.body)
		res.status(201).json({ message: 'Message sent' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});
module.exports = router;