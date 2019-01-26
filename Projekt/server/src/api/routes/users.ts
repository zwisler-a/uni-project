import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { userCreate, userGet, userUpdate, userDelete, userGetList } from '../controllers/users';
import { param } from './util';

/** express.Router for path `/api/users` */
export const usersRoute: Router = Router();
usersRoute.param('id', param);

usersRoute.post('/', verifyJsonWebToken, userCreate);
usersRoute.get('/:id', verifyJsonWebToken, userGet);
usersRoute.get('/', verifyJsonWebToken, userGetList);
usersRoute.patch('/:id', verifyJsonWebToken, userUpdate);
usersRoute.delete('/:id', verifyJsonWebToken, userDelete);
