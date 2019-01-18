import { Router, Response, Request, NextFunction } from 'express';

import { authenticate } from '../controllers/authentication';
import { usersRoute } from './users';
import { typesRoute } from './types';
import { itemsRoute } from './items';
import { OldApiError } from '../../types';

/** express.Router for path `/api` */
export const apiRouter: Router = Router();
apiRouter.post('/authenticate', authenticate);
apiRouter.use('/users', usersRoute);
apiRouter.use('/types', typesRoute);
apiRouter.use('/items', itemsRoute);
// If route is unknown throw a new NOT_FOUND error
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    next(OldApiError.NOT_FOUND);
});