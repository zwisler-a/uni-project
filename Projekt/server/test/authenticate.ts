
import { Server } from 'http';
import request from 'supertest';
import { expect } from 'chai';
import 'mocha';

import { App } from '../src/app';
import { config } from './config.test';

describe('authentication', () => {
    let app: App;
    let server: Server;
    before(async () => {
        app = await App.factory(config);
        server = app.express.listen(0);
    });
    after(async () => {
        server.close();
        await app.close();
    });
    it('valid credentials', done => {
        request(server)
            .post('/api/authenticate')
            .send({
                name: 'username',
                password: 'password'
            })
            .end((error, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys('short');
                expect(res.body).to.include.keys('long');
                done();
            });
    });
    it('invalid credentials username', done => {
        request(server)
            .post('/api/authenticate')
            .send({
                name: 'usernames',
                password: 'password'
            })
            .expect(401, done);
    });
    it('invalid credentials password', done => {
        request(server)
            .post('/api/authenticate')
            .send({
                name: 'username',
                password: 'passwors'
            })
            .expect(401, done);
    });
});