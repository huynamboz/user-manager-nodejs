const MessageRepository = require('../repositories/message.repository');

const getMessages = async () => {
	try {
		return await MessageRepository.getMessages();
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}
const getMessagebyId = async (id) => {
	try {
		return await MessageRepository.getMessagebyId(id);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}
const addMessage = async (message) => {
	try {
		return await MessageRepository.addMessage(message);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}
const updateMessage = async (id) => {
	try {
		return await MessageRepository.updateMessage(id);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}
module.exports = {
	getMessages,
	addMessage,
	updateMessage,
	getMessagebyId
}