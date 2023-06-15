const PollService = require('../services/poll.service');
const createNewPoll = async (req, res) => {
	try {
		console.log(req.body)
		const poll = await PollService.Create(req.body);
		if (poll){
			res.send(
			{ 
				data:{
					poll
				} 
			});
		} else {
			res.status(400).json({message: 'User not found'});
		}
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: 'Internal server error'});
	}
};

module.exports = {
	createNewPoll
}