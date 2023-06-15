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
module.exports = {
	Create
}