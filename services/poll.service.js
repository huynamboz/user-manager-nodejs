const PollRepository = require('../repositories/poll.repository');
const Create = async (poll) => {
	try {
		const options = poll.options;
		const pollId = await PollRepository.createPoll(poll, options);
		console.log(pollId);
		return await PollRepository.getPollById(pollId);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}

const GetPollById = async (id) => {
	try {
		return await PollRepository.getPollById(id);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}

const DeletePoll = async (id) => {
	try {
		return await PollRepository.deletePoll(id);
	} catch (error) {
		console.log(error);
		throw new Error('Internal server error');
	}
}
module.exports = {
	Create,
	GetPollById,
	DeletePoll
}