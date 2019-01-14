import path from 'path';
import crypto from 'crypto';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import mariadb from 'mariadb';

import { Config } from './types';
import { apiRouter } from './api/routes/api';
import { DatabaseController, initializeDatabaseController } from './database/controller';

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

    /** The app's database controller */
    dbController: DatabaseController;

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

        // Set database controller
        this.express.set('database', this.dbController);

        // Generate cryptographic secure jwt secret
        this.express.set('secret', process.env.NODE_ENV === 'production' ? crypto.randomBytes(64) : 'Secret');

        // Add en-/decoder
        this.express.use(morgan('dev'));
        this.express.use(compression());
        this.express.use(express.json());
        this.express.use(express.urlencoded({
            extended: true
        }));

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
    async initializeDatabase() {
        const database = this.config.database;
        this.dbPool = mariadb.createPool({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
        });
        this.dbController = await initializeDatabaseController(this.dbPool, database.prefix);
    }

    /** Closes all resources currently opened by the app (shutdown the app) */
    async close() {
        await this.dbPool.end();
    }
}
