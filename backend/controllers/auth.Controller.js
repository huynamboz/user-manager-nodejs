const AuthServices = require('../services/auth.service');
const TokenService = require('../services/token.service');
const UserController = require('./user.Controller');
const login = async (req, res) => {
	try {
		console.log(req.body)
		const { email, password } = req.body;
		const user = await AuthServices.loginUserWithEmailAndPassword(email, password);
		console.log("userconteoller",user)
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
		console.log(e);
		res.status(500).json({ message: e.message || 'Internal server error'});
	}
};

const register = async ( req, res) => {
	try {
		const user = req.body;
		const newUser = await AuthServices.register(user);
		res.status(201).json(
			{
				status: "Success",
				data: {
					name: newUser.name,
					email: newUser.email,
					id: newUser.id,
					avatar: newUser.avatar
				}
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