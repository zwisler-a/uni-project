import { Router } from 'express';

import { receivingResetRequest, validate, changePassword } from '../controllers/password_reset';

/** express.Router for path `/api/passwordReset` */
export const passwordResetRoute: Router = Router();
passwordResetRoute.post('/', receivingResetRequest);
passwordResetRoute.post('/validate', validate);
passwordResetRoute.post('/changePassword', changePassword);


