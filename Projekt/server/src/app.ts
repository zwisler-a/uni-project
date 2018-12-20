import path from 'path';
import express from 'express';
import morgan from 'morgan';
import mariadb from 'mariadb';

import { Config } from './config';
import { apiRouter } from './routes/api';

export class App {
    config: Config;

    app: express.Express;

    dbPool: mariadb.Pool;

    constructor(config: Config) {
        this.config = config;
        this.initializeExpress();
        this.initializeDatabase();

        // TODO remove just for testing
        this.app.set('secret', 'SpecialJWTSecretWOW!');
    }
    initializeExpress() {
        this.app = express();

        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/api', apiRouter);
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    initializeDatabase() {
        const database = this.config.database;
        this.dbPool = mariadb.createPool({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
        });
    }
    close() {
        this.dbPool.end();
    }
}