import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { typeCreate, typeGet, typeUpdate, typeGetAll, typeDelete } from '../controllers/types';
import { param } from './util';

/** express.Router for path `/api/types` */
export const typesRoute: Router = Router();
typesRoute.param('id', param);

typesRoute.post('/',        verifyJsonWebToken, verifyPermission(Permission.TYPE_EDIT), typeCreate);
typesRoute.get('/',         verifyJsonWebToken, typeGetAll); // TODO maybe when ITEM_READ
typesRoute.get('/:id',      verifyJsonWebToken, typeGet); // TODO maybe when ITEM_READ
typesRoute.patch('/:id',    verifyJsonWebToken, verifyPermission(Permission.TYPE_EDIT, 'id'), typeUpdate);
typesRoute.delete('/:id',   verifyJsonWebToken, verifyPermission(Permission.TYPE_EDIT, 'id'), typeDelete);