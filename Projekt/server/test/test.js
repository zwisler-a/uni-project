const app = require('../src/app');
const request = require('supertest');

describe('http server', () => {
	let server;
	beforeEach(() => {
		server = app.listen(0);
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