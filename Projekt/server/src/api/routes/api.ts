import { Router } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';
import { itemsRoute } from './items';

export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);
apiRouter.use('/item', itemsRoute);
