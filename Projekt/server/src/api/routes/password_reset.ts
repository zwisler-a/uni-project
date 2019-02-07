import { Router } from 'express';

import { companyDelete, companyGet, companyGetAll, companyUpdate } from '../controllers/companies';
import { param } from './util';
import { receivingResetRequest } from '../controllers/password_reset';

/** express.Router for path `/api/passwordReset` */
export const passwordResetRoute: Router = Router();
passwordResetRoute.param('id', param);
passwordResetRoute.post('/', receivingResetRequest);
passwordResetRoute.get('/', companyGetAll);
passwordResetRoute.get('/:id', companyGet);
passwordResetRoute.patch('/:id', companyUpdate);
passwordResetRoute.delete('/:id', companyDelete);


