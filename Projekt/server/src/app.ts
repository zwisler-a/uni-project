import path from 'path';
import crypto from 'crypto';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import mariadb from 'mariadb';

import { Config } from './types';
import { apiRouter } from './api/routes/api';
import { initializeTables } from './database/controller';

/**
 * Represents the backend's core
 * @author Maurice
 */
export class App {

    /** Generates a new instance of the App */
    static async factory(config: Config) {
        const app = new App(config);
        await app.initializeDatabase();
        await app.initializeExpress();
        return app;
    }

    /** The app's configuration */
    config: Config;

    /** The app's express instance */
    express: express.Express;

    /** The app's mariadb connection pool */
    dbPool: mariadb.Pool;

    /**
     * Creates new instance of the app
     * @param config App's configuration
     */
    constructor(config: Config) {
        this.config = config;
    }

    /** Initializes the app's express instance */
    initializeExpress() {
        this.express = express();
        this.express.disable('x-powered-by');

        // Generate cryptographic secure jwt secret
        this.express.set('secret', crypto.randomBytes(64));

        // Add en-/decoder
        this.express.use(morgan('dev'));
        this.express.use(compression());
        this.express.use(express.json());

        // Add default request handler
        this.express.use(express.static(path.join(__dirname, 'public')));
        this.express.use('/api', apiRouter);

        // Add default request handler for undefined routes
        this.express.get('*', (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        // Add default error handler
        this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status('status' in err ? err.status : 500).send({
                error: err.name,
                message: err.message,
                cause: err.cause
            });
        });
    }

    /** Initializes the app's mariadb connection pool and initializes all tables */
    initializeDatabase() {
        const database = this.config.database;
        this.dbPool = mariadb.createPool({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
        });
        this.express.set('pool', this.dbPool);
        return initializeTables(this.dbPool);
    }

    /** Closes all resources currently opened by the app (shutdown the app) */
    close() {
        this.dbPool.end();
    }
}
