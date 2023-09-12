const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

const getMessages = () => {
	return db.select().from('messages');
};
const addMessage = async (message) => {
	return db('messages').insert(message);
}
const updateMessage = async (id) => {
	return db('messages').where('id', id).update({ type: 'delete', message: 'This message has been deleted' });
}
const getMessagebyId = async (id) => {
	return db('messages').where('id', id).first();
}
module.exports = {
	getMessages,
	addMessage,
	updateMessage,
	getMessagebyId
}