const knex = require('knex');
require('dotenv').config();
const express = require('express');
const app = express();
const knexConfig = require('./knexfile');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const pollRouter = require('./routes/poll');
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/polls', pollRouter);
const environment = 'development';
// console log .env 
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE)
const config = knexConfig[environment];
console.log(config)
const db = knex(config);

const port = 3009
app.listen(port, function () {
	console.log(`Example app listening on port ${port}`)
})