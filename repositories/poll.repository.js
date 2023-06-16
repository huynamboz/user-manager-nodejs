const knex = require('knex');
const config = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);
// Lấy danh sách người dùng
const getPolls = () => {
	return db.select().from('polls');
};

const getPollById = async (id) => {
	// get poll and option of it
	return db('polls').where({ id }).first().then((poll) => {
		if (!poll) {
			return null;
		}
		return db('options').where({ poll_id: id }).then((options) => {
			return {
				...poll,
				options
			}
		})
	}
	);
};


function generateUUID() {
	let d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		d += performance.now(); // use high-precision timer if available
	}
	const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

const createPoll = async (poll, options) => {
	let poll_id = generateUUID();
	try {
		await db.transaction(function (trx) {
			return trx('polls')
				.insert({
					id: poll_id,
					question: poll.question,
					title: poll.title,
					user_id: poll.user_id,
					created_at: new Date(),
					updated_at: new Date(),
				})
				.then(function () {
					options = options.map((option) => {
						return {
							id: generateUUID(),
							poll_id: poll_id,
							content: option,
							created_at: new Date(),
							updated_at: new Date(),
						}
					});
					return trx('options').insert(options);
				})
				.then(trx.commit)
				.catch(trx.rollback);
		});
		console.log('Transaction complete.');
		return poll_id; // Trả về poll_id sau khi commit transaction thành công
	} catch (err) {
		console.error('Transaction error:', err);
		throw err;
	}
};

const updatePoll = (id, updatePoll) => {
	return db('poll').where({ id }).update(updatePoll);
};

const deletePoll = (id) => {
	return db('polls').where({ id }).del();
};
module.exports = {
	getPolls,
	getPollById,
	createPoll,
	updatePoll,
	deletePoll
};

