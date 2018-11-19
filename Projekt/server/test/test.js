const App = require('../src/app');
const request = require('supertest');

const config = {
	port: 0,
	mongo: 'mongodb://mongo:27017/ak18b'
};

describe('http server', () => {
	let server;
	beforeEach(() => {
		server = new App(config).app.listen(0);
	});
	afterEach(() => {
		server.close();
	});
	it('200 response to /', done => {
		request(server)
			.get('/')
			.expect(200, done);
	});
	it('404 response', done => {
		request(server)
			.get('/foo')
			.expect(404, done);
	});
});