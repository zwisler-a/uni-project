import { Router, Response, Request, NextFunction } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';

/** express.Router for path `/api/users` */
export const usersRoute: Router = Router();
usersRoute.post('/', validateJsonWebToken, (req: Request, res: Response, next: NextFunction) => {
  res.send('create user');
});
usersRoute.get('/:id', validateJsonWebToken, (req: Request, res: Response, next: NextFunction) => {
  res.send(`get user ${req.params.id}`);
});
usersRoute.patch('/:id', validateJsonWebToken, (req: Request, res: Response, next: NextFunction) => {
  res.send(`update user ${req.params.id}`);
});
usersRoute.delete('/:id', validateJsonWebToken, (req: Request, res: Response, next: NextFunction) => {
  res.send(`delete user ${req.params.id}`);
});
