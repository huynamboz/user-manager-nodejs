const knex = require('knex');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
   });
// app.use(cors())

const  http = require('http').Server(app);
const Realtime = require('./services/socket.service')
Realtime.connect(http);
const knexConfig = require('./knexfile');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const pollRouter = require('./routes/poll');
const LtesRouter = require('./routes/ltes');
const Message = require('./routes/messages');
const QrRouter = require('./routes/qr');

app.use('/users', usersRouter);
app.use('/qr', QrRouter);
app.use('/auth', authRouter);
app.use('/polls', pollRouter);
app.use('/ltes', LtesRouter);
app.use('/messages', Message);
http.listen(process.env.SOCKET_PORT, function(){
	  console.log('listening on', process.env.SOCKET_PORT);
});
const environment = 'development';
// console log .env 
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE)
const config = knexConfig[environment];
console.log(config)
const db = knex(config);

const port = 3009;
const ip = '0.0.0.0';
app.listen(port, ip, function () {
	console.log(`Example app listening on port ${port}`)
})