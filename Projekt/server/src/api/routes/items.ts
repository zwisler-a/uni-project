import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { itemGetList, itemCreate, itemGet, itemUpdate, itemDelete, itemGetGlobalList } from '../controllers/items';
import { WsServer } from '../../ws';

/** express.Router for path `/api/items` */
export const itemsRoute: Router = Router();
itemsRoute.get('/', verifyJsonWebToken, itemGetGlobalList);
itemsRoute.get('/:type', verifyJsonWebToken, itemGetList);
itemsRoute.post('/:type', verifyJsonWebToken, WsServer.handlers.distibute, itemCreate);
itemsRoute.get('/:type/:id', verifyJsonWebToken, itemGet);
itemsRoute.patch('/:type/:id', verifyJsonWebToken, WsServer.handlers.distibute, itemUpdate);
itemsRoute.delete('/:type/:id', verifyJsonWebToken, WsServer.handlers.distibute, itemDelete);
