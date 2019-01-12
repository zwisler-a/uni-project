import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { typeCreate, typeGet, typeGetAll, typeDelete } from '../controllers/types';

export const typesRoute: Router = Router();
typesRoute.post('/', validateJsonWebToken, typeCreate);
typesRoute.get('/', validateJsonWebToken, typeGetAll);
typesRoute.get('/:id', validateJsonWebToken, typeGet);
typesRoute.delete('/:id', validateJsonWebToken, typeDelete);