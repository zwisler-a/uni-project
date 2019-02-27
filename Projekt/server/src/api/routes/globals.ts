import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { globalCreate, globalGet, globalUpdate, globalDelete } from '../controllers/globals';
import { param } from './util';

/** express.Router for path `/api/globals` */
export const globalRoute: Router = Router();
globalRoute.param('id', param);

globalRoute.post('/', verifyJsonWebToken, globalCreate);
globalRoute.get('/', verifyJsonWebToken, globalGet);
globalRoute.patch('/:id', verifyJsonWebToken, globalUpdate);
globalRoute.delete('/:id', verifyJsonWebToken, globalDelete);
