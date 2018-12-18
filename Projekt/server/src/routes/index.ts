import { Router, Response, Request, NextFunction } from 'express';

export const router: Router = Router();
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({ foo: 'bar' });
});