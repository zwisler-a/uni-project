
import { Server } from 'http';
import request from 'supertest';
import { expect } from 'chai';
import 'mocha';

import { App } from '../src/app';
import { config } from './config.test';
import { beforeEach } from 'mocha';

describe('authentication', () => {
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
    it('valid credentials', done => {
        request(server)
            .post('/api/authenticate')
            .send({
                username: 'empty',
                password: 'password'
            })
            .end((error, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys('token');
                done();
            });
    });
    it('invalid credentials', done => {
        request(server)
            .post('/api/authenticate')
            .send({
                username: 'empty',
                password: 'passwors'
            })
            .expect(401, done);
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