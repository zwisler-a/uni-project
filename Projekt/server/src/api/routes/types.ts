import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { typeCreate, typeGet, typeUpdate, typeGetAll, typeDelete } from '../controllers/types';
import { param } from './util';

/** express.Router for path `/api/types` */
export const typesRoute: Router = Router();
typesRoute.param('id', param);

typesRoute.post('/', verifyJsonWebToken, typeCreate);
typesRoute.get('/', verifyJsonWebToken, typeGetAll);
typesRoute.get('/:id', verifyJsonWebToken, typeGet);
typesRoute.patch('/:id', verifyJsonWebToken, typeUpdate);
typesRoute.delete('/:id', verifyJsonWebToken, typeDelete);