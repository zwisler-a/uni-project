import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';

/**
 * Middleware that checks if the user is authenticated and attaches user object to req.params
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export function validateJsonWebToken(req: Request, res: Response, next: NextFunction) {
    const groups = /Bearer (.*)/ig.exec(req.get('Authorization'));
    if (!groups || groups.length < 2) {
        next(new ApiError('Unauthorized', 'No jsonwebtoken was provided', 401));
        return;
    }

    jsonwebtoken.verify(groups[1], req.app.get('secret'), (err: any, decoded: object) => {
        if (err) {
            next(new ApiError('Unauthorized', 'The provided jsonwebtoken is invalid', 401, err));
        } else {
            req.params.user = decoded;
            next();
        }
    });
}

/**
 * Route endpoint `POST /api/authenticate` used to authenticate and to generate JWT
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function authenticate(req: Request, res: Response, next: NextFunction) {
    if (!('username' in req.body) || !('password' in req.body)) {
        next(new ApiError('Bad Request', 'Required field: username, password', 400));
        return;
    }

    try {
        const database: DatabaseController = req.app.get('database');
        const user = (await database.USER_GET_ID.execute(req.body.username)).pop();
        if (!user) {
            next(new ApiError('Unauthorized', 'Authentication failed due to invalid credentials', 401));
            return;
        }

        const success = await bcrypt.compare(req.body.password, user.password);

        if (success) {
            delete user.password;

            const token = jsonwebtoken.sign(
                user,
                req.app.get('secret'),
                {
                    expiresIn: '1d'
                }
            );

            res.status(200).send({ token });
        } else {
            next(new ApiError('Unauthorized', 'Authentication failed due to invalid credentials', 401));
        }
    } catch (err) {
        next(new ApiError('Unauthorized', 'Authentication failed due to unexpected error', 401, err));
    }
}