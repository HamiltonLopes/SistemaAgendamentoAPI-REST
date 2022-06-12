import express from 'express';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import routes from './router.js';
import './database/index.js';



export default new class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use('/files', express.static(resolve(dirname(fileURLToPath(import.meta.url)), '..', 'tmp', 'uploads')));
    }

    routes() {
        this.server.use(routes);
    }

}