import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { itemGetList, itemCreate, itemGet, itemUpdate, itemDelete, itemGetGlobalList } from '../controllers/items';
import { param } from './util';

/** express.Router for path `/api/items` */
export const itemsRoute: Router = Router();
itemsRoute.param('type', param);
itemsRoute.param('id', param);

itemsRoute.get('/',             verifyJsonWebToken, itemGetGlobalList);
itemsRoute.get('/:type',        verifyJsonWebToken, verifyPermission(Permission.ITEM_READ,  'type'), itemGetList);
itemsRoute.post('/:type',       verifyJsonWebToken, verifyPermission(Permission.ITEM_WRITE, 'type'), itemCreate);
itemsRoute.get('/:type/:id',    verifyJsonWebToken, verifyPermission(Permission.ITEM_READ,  'type'), itemGet);
itemsRoute.patch('/:type/:id',  verifyJsonWebToken, verifyPermission(Permission.ITEM_WRITE, 'type'), itemUpdate);
itemsRoute.delete('/:type/:id', verifyJsonWebToken, verifyPermission(Permission.ITEM_WRITE, 'type'), itemDelete);
