import { Router } from 'express';
import { verifyJsonWebToken } from '../controllers/authentication';
import { param } from './util';
import { companyCreate, companyGet, companyUpdate, companyDelete } from '../controllers/companies';

/** express.Router for path `/api/companies` */
export const companiesRoute: Router = Router();
companiesRoute.param('id', param);

companiesRoute.post('/', verifyJsonWebToken, companyCreate);
// companiesRoute.get('/', verifyJsonWebToken, null);
companiesRoute.get('/:id', verifyJsonWebToken, companyGet);
companiesRoute.patch('/:id', verifyJsonWebToken, companyUpdate);
companiesRoute.delete('/:id', verifyJsonWebToken, companyDelete);
