import { Router, Response, Request, NextFunction } from 'express';

export const usersRoute: Router = Router();
usersRoute.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('create user');
});
usersRoute.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.send(`get user ${req.params.id}`);
});
usersRoute.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.send(`update user ${req.params.id}`);
});
usersRoute.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.send(`delete user ${req.params.id}`);
});
