import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { globalCreate, globalGet, globalUpdate, globalDelete } from '../controllers/globals';
import { param } from './util';

/** express.Router for path `/api/globals` */
export const globalRoute: Router = Router();
globalRoute.param('id', param);

globalRoute.post('/',       verifyJsonWebToken, verifyPermission(Permission.GLOBAL_FIELD), globalCreate);
globalRoute.get('/',        verifyJsonWebToken, globalGet); // TODO maybe when ITEM_READ
globalRoute.patch('/:id',   verifyJsonWebToken, verifyPermission(Permission.GLOBAL_FIELD), globalUpdate);
globalRoute.delete('/:id',  verifyJsonWebToken, verifyPermission(Permission.GLOBAL_FIELD), globalDelete);
