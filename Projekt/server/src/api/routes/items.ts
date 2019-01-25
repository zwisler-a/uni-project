import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { itemGetList, itemCreate, itemGet, itemUpdate, itemDelete } from '../controllers/items';

/** express.Router for path `/api/items` */
export const itemsRoute: Router = Router();
itemsRoute.get('/:type', verifyJsonWebToken, itemGetList);
itemsRoute.post('/:type', verifyJsonWebToken, itemCreate);
itemsRoute.get('/:type/:id', verifyJsonWebToken, itemGet);
itemsRoute.patch('/:type/:id', verifyJsonWebToken, itemUpdate);
itemsRoute.delete('/:type/:id', verifyJsonWebToken, itemDelete);
