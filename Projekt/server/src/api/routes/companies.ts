import { Router } from 'express';

import { verifyJsonWebToken } from '../controllers/authentication';
import { verifyPermission } from '../controllers/roles';
import { Permission } from '../models/role';

import { companyCreate, companyDelete, companyGet, companyGetAll, companyUpdate } from '../controllers/companies';
import { param } from './util';

/** express.Router for path `/api/companies` */
export const companiesRoute: Router = Router();
companiesRoute.param('id', param);

companiesRoute.post('/',        verifyJsonWebToken, verifyPermission(Permission.GLOBAL_ADMIN), companyCreate);

// TODO set permission back. Just a bit to hard to do it in the fronend at the moment ... sorry
companiesRoute.get('/',         verifyJsonWebToken, companyGetAll);
// companiesRoute.get('/',         verifyJsonWebToken, verifyPermission(Permission.GLOBAL_ADMIN), companyGetAll);
companiesRoute.get('/:id',      verifyJsonWebToken, companyGet);
companiesRoute.patch('/:id',    verifyJsonWebToken, verifyPermission(Permission.GLOBAL_ADMIN), companyUpdate);
companiesRoute.delete('/:id',   verifyJsonWebToken, verifyPermission(Permission.GLOBAL_ADMIN), companyDelete);
