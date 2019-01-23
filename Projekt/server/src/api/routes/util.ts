import { Response, Request, NextFunction } from 'express';
import { ApiError, ErrorNumber } from '../../types';

export function param(req: Request, res: Response, next: NextFunction, value: any, name: string) {
    const id = parseInt(value, 10);
    if (isNaN(id)) {
        next(ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_NUMBER_FORMAT, value));
    } else {
        req.params[name] = id;
        next();
    }
}