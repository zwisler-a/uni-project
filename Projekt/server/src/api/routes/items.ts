import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { itemCreate, itemGet, itemUpdate, itemDelete } from '../controllers/items';

export const itemsRoute: Router = Router();
itemsRoute.post('/:type', validateJsonWebToken, itemCreate);
itemsRoute.get('/:type/:id', validateJsonWebToken, itemGet);
itemsRoute.patch('/:type/:id', validateJsonWebToken, itemUpdate);
itemsRoute.delete('/:type/:id', validateJsonWebToken, itemDelete);