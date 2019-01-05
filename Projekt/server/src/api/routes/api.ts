import { Router } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';
import { itemsRoute } from './items';
import { fieldsRoute } from './fields';

export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);
apiRouter.use('/items', itemsRoute);
apiRouter.use('/fields', fieldsRoute);
