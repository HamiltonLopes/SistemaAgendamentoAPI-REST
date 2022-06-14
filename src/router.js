import {Router} from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import FileController from './app/controllers/FileController.js';
import CollaboratorController from './app/controllers/CollaboratorController.js';
import AppointmentController from './app/controllers/AppointmentController.js';
import ScheduleController from './app/controllers/ScheduleController.js';
import NotificationController from './app/controllers/NotificationController.js';

import authMiddleware from './app/middlewares/auth.js';

import multerConfig from './config/multer.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); //criar usuario
routes.post('/session', SessionController.store); //login

//Rotas Autenticadas
routes.use(authMiddleware);

routes.put('/users', UserController.update); //alterar usuario
routes.patch('/newprovider', UserController.newProvider); //transforma o usuario em provider

routes.get('/collaborators', CollaboratorController.index); //listar colaboradores

routes.post('/files', upload.single('file'), FileController.store); //inserir picture

routes.get('/appointments', AppointmentController.index); //lista de appointments do usuario
routes.post('/appointments', AppointmentController.store); //criar appointment

routes.get('/schedule', ScheduleController.index); //lista de appointments do colaborador

routes.get('/notifications', NotificationController.index); //lista notificacoes para collaborador
routes.put('/notifications/:id', NotificationController.update); //notificação como lida


export default routes;

