import { Router } from 'express';

import { validateJsonWebToken } from '../controllers/authentication';
import { getItem, listItems } from '../controllers/item';

export const itemsRoute: Router = Router();
itemsRoute.get('/', validateJsonWebToken, listItems);
itemsRoute.get('/:typeId', validateJsonWebToken, listItems);
itemsRoute.get('/:typeId/:itemId', validateJsonWebToken, getItem);
