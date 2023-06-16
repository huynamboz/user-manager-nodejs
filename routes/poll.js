const express = require('express');
const router = express.Router();
const pollController = require('../controllers/poll.Controller');
const bodyParser = require('body-parser')
const AuthMiddleware = require('../middlewares/auth.middleware');

router.use(bodyParser.json())
// Lấy danh sách người dùng
router.post('/', async (req, res) => {
	try {
		const data = await pollController.createNewPoll(req, res);
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/:id',[AuthMiddleware.authorize], async (req, res) => {
	try {
		const data = await pollController.getPollById(req, res);
		res.json(data);
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const data = await pollController.deletePoll(req, res);
		res.json(data);
	}
	catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});
module.exports = router;