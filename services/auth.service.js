const TokenService = require('./token.service');
const UserController = require('../controllers/user.Controller');
const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await UserController.getUserByEmail(email);
	console.log(user)
	if (!user){
		throw new Error({message: 'not found'});
	}
	const passwordHashed = TokenService.hashPasswordWithSalt(password, process.env.SALT);
	if (user.password == passwordHashed.password){
		return {
			id: user.id,
			email : user.email,
			name : user.name,
		}
	}
}

const register = async ( user ) => {
	try {
		const hashedPassword = TokenService.hashPasswordWithSalt(user.password, process.env.SALT );
		user.password = hashedPassword.password;
		console.log(user)
		return await UserController.createUser(user);
	} catch (error) {
		throw new Error('Internal server error');
	}
}
module.exports = {
	loginUserWithEmailAndPassword,
	register
}