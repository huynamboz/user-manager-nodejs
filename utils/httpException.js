class httpError {
	// constructor(message) {
	// 	this.message = message || 'Internal Server Error';
	// 	this.statusCode = 500;
	// }
}
class httpForbiddenError extends httpError {
	constructor(message) {
	super(message);
	this.message = message || 'Forbidden';
	this.statusCode = 403;
	}
}
class httpBadRequestError extends httpError {
	constructor(message) {
	super('message');
	this.message = message || 'Bad Request';
	this.statusCode = 400;
	}
}
class httpNotFoundError extends httpError {}
class httpInternalServerError extends httpError {
	constructor(message) {
		super('message');
		this.message = message || 'Internal server error';
		this.statusCode = 500;
	}
}
class httpBadGatewayError extends httpError {}
module.exports = {
	httpError,
	httpForbiddenError,
	httpBadRequestError,
	httpNotFoundError,
	httpInternalServerError,
	httpBadGatewayError
};
