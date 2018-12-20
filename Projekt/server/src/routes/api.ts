import { Router } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';

export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);