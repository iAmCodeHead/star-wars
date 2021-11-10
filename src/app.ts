import express from 'express';
import { BASE_PATH, DATABASE_URL, ENVIRONMENT } from './config';
import { errorHandler, global } from './middlewares';
import { logger } from './utils';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { moviesRouter } from './api/Movies';
import { charactersRouter } from './api/Characters/charactersRouter';

class App {
    public express = express();
    public basePath = BASE_PATH || '';
    constructor() {
        this.boot();
    }

    private boot() {
        this.initializeDb();
        this.registerMiddlewares();
        this.mountRoutes();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {
        this.express.use(`${this.basePath}/movies`, moviesRouter);
        this.express.use(`${this.basePath}/characters`, charactersRouter);
    }

    private registerMiddlewares() {
        global(this.express);
    }

    private async initializeDb() {
        if (ENVIRONMENT !== 'test') {
            try {
                await createConnection({
                    type: 'postgres',
                    url: DATABASE_URL,
                    synchronize: false,
                    migrations: ['/src/db/migrations/*.ts'],
                    entities: [__dirname + '/api/**/*Model.js'],
                });
                logger.info('Database connection has been established successfully.');
            } catch (err) {
                console.log(err);
                throw new Error(('Unable to connect to the database:' + err));
            }
        }

    }

    // Error handlers
    private handleUncaughtErrorEvents() {
        process.on('unhandledRejection', (reason, promise) => {
            throw reason;
        });

        process.on('uncaughtException', (error) => {
            logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });

        process.on('SIGINT', () => {
            logger.info(' Alright! Bye bye!');
            process.exit();
        });

        this.express.use(errorHandler);

    }
}

const app = new App().express;
export default app;
