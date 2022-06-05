import {Router} from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();

// routes.get('/', async (req, res)=>{
//     const user = await User.create({
//         name: 'Hamilton',
//         email: 'qualquer@email.com',
//         password_hash: 'senha',
//     });
//     return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

//Rotas Autenticadas
routes.use(authMiddleware);
routes.put('/users', UserController.update);


export default routes;

