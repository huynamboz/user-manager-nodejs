module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: process.env.HOST,
			user: process.env.USER,
			password: process.env.PASSWORD,
			database: process.env.DATABASE
		},
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seeds'
		}
	}
};
