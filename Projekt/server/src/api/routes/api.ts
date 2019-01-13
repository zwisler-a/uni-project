import { Router, Response, Request, NextFunction } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';
import { typesRoute } from './types';
import { itemsRoute } from './items';
import { ApiError } from '../../types';

export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);
apiRouter.use('/types', typesRoute);
apiRouter.use('/items', itemsRoute);
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    next(ApiError.NOT_FOUND);
});