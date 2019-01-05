import { Router, Response, Request, NextFunction } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { listItems } from '../controllers/item';

export const itemsRoute: Router = Router();
itemsRoute.get('/', validateJsonWebToken, listItems);
