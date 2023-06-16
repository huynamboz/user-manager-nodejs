const AuthServices = require('../services/auth.service');
const TokenService = require('../services/token.service');
const UserController = require('./user.Controller');
const login = async (req, res) => {
	try {
		console.log(req.body)
		const { email, password } = req.body;
		const user = await AuthServices.loginUserWithEmailAndPassword(email, password);
		if (user){
			const tokens = await TokenService.signToken(user);
			res.send(
			{ 
				data:{
					user, tokens
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

const register = async ( req, res) => {
	try {
		const user = req.body;
		const newId = await AuthServices.register(user);
		console.log(newId);
		const newUser = await UserController.getUserById(newId[0]);
		res.status(201).json(
			{
				status: "Success",
				data: newUser
			}
		)
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message || 'Internal server error'});
	}
}
module.exports = {
	login,
	register
}