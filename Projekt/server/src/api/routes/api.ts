import { Router, Response, Request, NextFunction } from 'express';

import { authenticate, verifyJsonWebToken, renew } from '../controllers/authentication';
import { usersRoute } from './users';
import { typesRoute } from './types';
import { itemsRoute } from './items';
import { rolesRoute } from './roles';
import { ApiError, ErrorNumber } from '../../types';

/** express.Router for path `/api` */
export const apiRouter: Router = Router();
apiRouter.get('/authenticate', verifyJsonWebToken, (req: Request, res: Response, next: NextFunction) => res.status(200).send());
apiRouter.post('/authenticate', authenticate);
apiRouter.patch('/authenticate', renew);
apiRouter.use('/users', usersRoute);
apiRouter.use('/types', typesRoute);
apiRouter.use('/items', itemsRoute);
apiRouter.use('/roles', rolesRoute);

// If route is unknown throw a new NOT_FOUND error
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    next(ApiError.NOT_FOUND(ErrorNumber.REQUEST_URL_UNDEFINED));
});