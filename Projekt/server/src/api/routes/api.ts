import { Router } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';
import { typesRoute } from './types';

export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);
apiRouter.use('/types', typesRoute);