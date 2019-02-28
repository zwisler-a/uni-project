import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { userCreate, userGet, userUpdate, userDelete, userGetList } from '../controllers/users';
import { param } from './util';

/** express.Router for path `/api/users` */
export const usersRoute: Router = Router();
usersRoute.param('id', param);

usersRoute.post('/',        verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), userCreate);
usersRoute.get('/:id',      verifyJsonWebToken, userGet);
usersRoute.get('/',         verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), userGetList);
usersRoute.patch('/:id',    verifyJsonWebToken, userUpdate);
usersRoute.delete('/:id',   verifyJsonWebToken, verifyPermission(Permission.LOCAL_ADMIN), userDelete);
