import path from 'path';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import mariadb from 'mariadb';

import { Config } from './types';
import { apiRouter } from './api/routes/api';
import { initializeTables } from './database/controller';

export class App {
    config: Config;

    app: express.Express;

    dbPool: mariadb.Pool;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * Prepares the app for startup.
     * Resolves promise once everything is ready
     */
    async setup() {
        return Promise.all([
            this.initializeExpress(),
            this.initializeDatabase()
        ]);
    }

    private initializeExpress() {
        this.app = express();
        this.app.disable('x-powered-by');

        // TODO remove just for testing
        this.app.set('secret', 'SpecialJWTSecretWOW!');

        // Add en-/decoder
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(express.json());

        // Add default request handler
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/api', apiRouter);

        // Add default request handler for undefined routes
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        // Add default error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status('status' in err ? err.status : 500).send({
                error: err.name,
                message: err.message,
                cause: err.cause
            });
        });
    }

    private initializeDatabase() {
        const database = this.config.database;
        this.dbPool = mariadb.createPool({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
        });
        this.app.set('pool', this.dbPool);
        return initializeTables(this.dbPool);
    }

    close() {
        this.dbPool.end();
    }
}

/** Generates a new instance of the App */
export async function AppFactory(config: Config) {
    const app = new App(config);
    await app.setup();
    return app;
}