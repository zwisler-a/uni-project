import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { companyCreate, companyDelete, companyGet, companyGetAll, companyUpdate } from '../controllers/companies';
import { param } from './util';

/** express.Router for path `/api/companies` */
export const companiesRoute: Router = Router();
companiesRoute.param('id', param);

companiesRoute.post('/', verifyJsonWebToken, companyCreate);
companiesRoute.get('/', verifyJsonWebToken, companyGetAll);
companiesRoute.get('/:id', verifyJsonWebToken, companyGet);
companiesRoute.patch('/:id', verifyJsonWebToken, companyUpdate);
companiesRoute.delete('/:id', verifyJsonWebToken, companyDelete);
