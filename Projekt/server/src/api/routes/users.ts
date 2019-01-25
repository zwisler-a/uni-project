import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { userCreate, userGet, userUpdate, userDelete } from '../controllers/users';
import { param } from './util';

/** express.Router for path `/api/users` */
export const usersRoute: Router = Router();
usersRoute.param('id', param);

usersRoute.post('/', verifyJsonWebToken, userCreate);
usersRoute.get('/:id', verifyJsonWebToken, userGet);
usersRoute.patch('/:id', verifyJsonWebToken, userUpdate);
usersRoute.delete('/:id', verifyJsonWebToken, userDelete);
