import {Router} from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import FileController from './app/controllers/FileController.js';
import CollaboratorController from './app/controllers/CollaboratorController.js';
import AppointmentController from './app/controllers/AppointmentController.js';

import authMiddleware from './app/middlewares/auth.js';

import multerConfig from './config/multer.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

//Rotas Autenticadas
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/collaborators', CollaboratorController.index)

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

export default routes;

