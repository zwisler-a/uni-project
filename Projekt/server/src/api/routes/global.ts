import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { globalCreate, globalGet, globalUpdate, globalDelete } from '../controllers/global';
import { param } from './util';

/** express.Router for path `/api/companies` */
export const companiesRoute: Router = Router();
companiesRoute.param('id', param);

companiesRoute.post('/', verifyJsonWebToken, globalCreate);
companiesRoute.get('/', verifyJsonWebToken, globalGet);
companiesRoute.patch('/:id', verifyJsonWebToken, globalUpdate);
companiesRoute.delete('/:id', verifyJsonWebToken, globalDelete);
