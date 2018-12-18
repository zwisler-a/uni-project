import path from 'path';
import express from 'express';
import morgan from 'morgan';
import mariadb from 'mariadb';
import { Config } from './config';

import { router as indexRouter } from './routes/index';
import { router as usersRouter } from './routes/users';

export class App {
    config: Config;

    app: express.Express;

    dbPool: mariadb.Pool;

    constructor(config: Config) {
        this.config = config;
        this.initializeExpress();
        this.initializeDatabase();
    }
    initializeExpress() {
        this.app = express();

        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use('/', indexRouter);
        this.app.use('/users', usersRouter);
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