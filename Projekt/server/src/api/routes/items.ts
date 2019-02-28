import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { itemGetList, itemCreate, itemGet, itemUpdate, itemDelete, itemGetGlobalList } from '../controllers/items';
import { param } from './util';

/** express.Router for path `/api/items` */
export const itemsRoute: Router = Router();
itemsRoute.param('type', param);
itemsRoute.param('id', param);

itemsRoute.get('/', verifyJsonWebToken, itemGetGlobalList);
itemsRoute.get('/:type', verifyJsonWebToken, itemGetList);
itemsRoute.post('/:type', verifyJsonWebToken, itemCreate);
itemsRoute.get('/:type/:id', verifyJsonWebToken, itemGet);
itemsRoute.patch('/:type/:id', verifyJsonWebToken, itemUpdate);
itemsRoute.delete('/:type/:id', verifyJsonWebToken, itemDelete);
