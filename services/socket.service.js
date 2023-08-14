let data = [
	{
		id: "26164245-e315-4251-b3b4-21e457f35f28",
		message: "Các bạn có thắc mắc hay cần thêm thông tin gì về trại hè thì nhắn ở đây chúng mình giải đáp cho nha ^^",
		message_id: "aff839cf-fef5-4353-8402-a0cf7bbe5c7e",
		name: "AT",
		role: "admin",
	}
]
let sum =0;
const connectedSockets = new Set(); 
let connection = null;
class Realtime {
	constructor() {
		this._socket = null;
	}
	connect(server) {
		const io = require('socket.io')(server, {
			cors: {
			  origin: process.env.SOCKET_CLIENT, // Replace with the actual origin of your Nuxt.js client
			  methods: ['GET', 'POST'],
			},
		  });
        io.on('connection', (socket) => {
			connectedSockets.add(socket);
            this._socket = socket; 
            this._socket.on('SEND',(data)=>{
                console.log(data)
				this._socket.emit('SEND',data);
            });

            this._socket.on('disconnect', function () {
                console.log(socket.id,"Un socket se desconecto", --sum);
				connectedSockets.delete(socket);
            });

            console.log(`New socket connection: ${connectedSockets.length}`, ++sum);
        });
	}
	sendEvent(event, data) {
		// this._socket.emit(event, data);
		for (const socket of connectedSockets) {
			socket.emit('SEND', data);
		  }
	}
	registerEvent(event, callback) {
		this._socket.on(event, callback);
	}
	static init(server) {
		if (!connection) {
			connection = new Realtime();
			connection.connect(server);
		}
		return connection;
	}
	static getConnection() {
		if (!connection) {
			throw new Error('Connection not initialized');
		}
		return connection;
	}

}


const handleSocket = (socket) => {
	console.log('a user connected');
	socket.on('SEND', (socketData) => {
		console.log('Received from client:', socketData);
		data.push(data);
		socket.broadcast.emit('SEND', socketData);
		socket.emit('serverEvent', { message: 'Hello from server!' });
	});
}

module.exports = {
	connect: Realtime.init,
	connection: Realtime.getConnection
}