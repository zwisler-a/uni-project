
import { Server } from 'http';
import request from 'supertest';
import 'mocha';

import { App } from '../src/app';
import { config } from './config.test';

describe('http server', () => {
    let app: App;
    let server: Server;
    beforeEach(() => {
        app = new App(config);
        server = app.app.listen(0);
    });
    afterEach(() => {
        server.close();
        app.close();
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
    it('mariaDB connection', done => {
        app.dbPool.getConnection()
            .then(connection => {
                connection.end();
                done();
            }).catch(err => {
                throw err;
            });
    });
});