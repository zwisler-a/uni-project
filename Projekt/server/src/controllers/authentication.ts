import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ApiError } from '../types';

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

export function authenticate(req: Request, res: Response, next: NextFunction) {
    // TODO do database request (for the moment use hardcoded password: 'password')
    bcrypt.compare(req.body.password, '$2b$10$sFut8f1wXaMisJ750uiGbOD8UefoIZLLad5a66M7f/YMV5okNUgEC', (error, success) => {
        if (error || !success) {
            res.status(401).send({
                message: 'Authentication failed'
            });
            return;
        }

        const token = jsonwebtoken.sign(
            {
                some: 'nice',
                test: 'data',
                '!': 1
            },
            req.app.get('secret'),
            {
                expiresIn: '1h'
            }
        );

        res.status(200).send({ token });
    });
}