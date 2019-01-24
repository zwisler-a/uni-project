import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { userCreate, userGet, userUpdate, userDelete } from '../controllers/users';
import { param } from './util';

/** express.Router for path `/api/users` */
export const usersRoute: Router = Router();
usersRoute.param('id', param);

usersRoute.post('/', validateJsonWebToken, userCreate);
usersRoute.get('/:id', validateJsonWebToken, userGet);
usersRoute.patch('/:id', validateJsonWebToken, userUpdate);
usersRoute.delete('/:id', validateJsonWebToken, userDelete);
