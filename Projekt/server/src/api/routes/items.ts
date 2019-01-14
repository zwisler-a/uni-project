import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { itemGetList, itemCreate, itemGet, itemUpdate, itemDelete } from '../controllers/items';

/** express.Router for path `/api/items` */
export const itemsRoute: Router = Router();
itemsRoute.get('/:type', validateJsonWebToken, itemGetList);
itemsRoute.post('/:type', validateJsonWebToken, itemCreate);
itemsRoute.get('/:type/:id', validateJsonWebToken, itemGet);
itemsRoute.patch('/:type/:id', validateJsonWebToken, itemUpdate);
itemsRoute.delete('/:type/:id', validateJsonWebToken, itemDelete);
