const { get } = require('../routes/auth');
const PollService = require('../services/poll.service');
const createNewPoll = async (req, res) => {
	try {
		console.log(req.body)
		const poll = await PollService.Create(req.body);
		console.log(poll)
		if (poll){
			res.send({ 
				data:poll
			});
		} else {
			res.status(400).json({message: 'User not found'});
		}
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: 'Internal server error'});
	}
};

const getPollById = async (req, res) => {
	try {
		const poll = await PollService.GetPollById(req.params.id);
		if (poll){
			res.send({
				data: poll
			});
		} else {
			res.status(400).json({message: 'Poll not found'});
		}
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: 'Internal server error'});
	}
}

const deletePoll = async (req, res) => {
	try {
		await PollService.DeletePoll(req.params.id);
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: 'Internal server error'});
	}
}
module.exports = {
	createNewPoll,
	getPollById,
	deletePoll
}