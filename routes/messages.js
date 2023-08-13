const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const Realtime = require('../services/socket.service');
const MessageService = require('../services/message.service');
router.post('/', async (req, res) => {
	try {
		const message = req.body;
		if ( !message.name || !message.role || !message.user_id || !message.type) {
			return res.status(400).json({ error: 'Invalid input' });
		}
		const idMessage = await MessageService.addMessage(req.body);
		const messageNew = await MessageService.getMessagebyId(idMessage[0]);
		const connection = Realtime.connection();
		connection.sendEvent('SEND', messageNew)
		res.status(201).json({ message: 'Message sent' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.get('/', async (req, res) => {
	try {
		const messages = await MessageService.getMessages();
		res.status(200).json({
			data: messages
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.delete('/:id', async (req, res) => {
	try {
		await MessageService.updateMessage(req.params.id);
		const message = await MessageService.getMessagebyId(req.params.id);
		const connection = Realtime.connection();
		connection.sendEvent('DELETE', message)
		res.status(200).json({
			data: message
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});
module.exports = router;