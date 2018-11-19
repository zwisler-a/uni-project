const App = require('../src/app');
const request = require('supertest');

describe('http server', () => {
	let server;
	beforeEach(() => {
		server = new App({
			port: 0,
			mongo: 'mongodb://username:password@mongo:27017/database'
		}).app.listen(0);
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