import express from 'express';
import routes from './router.js';
import Database from './database/index.js';


export default new class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }

}