import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ApiError, ErrorNumber } from '../../types';
import { USER_AUTH, User } from '../models/user';
import { UserModel } from '../../database/models/user';

enum TokenType {
    SHORT,
    LONG
}

function generateToken(type: TokenType, secret: any, expiresIn: string, payload: any = {}) {
    return jsonwebtoken.sign({ ...payload, type }, secret, { expiresIn });
}

/**
 * Middleware that checks if the user is authenticated and attaches user object to req.params
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export function verifyJsonWebToken(req: Request, res: Response, next: NextFunction) {
    const groups = /Bearer (.*)/ig.exec(req.get('Authorization'));
    if (!groups || groups.length < 2) {
        next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_MISSING_JSONWEBTOKEN));
        return;
    }

    jsonwebtoken.verify(groups[1], req.app.get('secret'), (error: any, decoded: any) => {
        if (error) {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_JSONWEBTOKEN, error));
        } else if (decoded.type !== TokenType.SHORT) {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_JSONWEBTOKEN, 'type !== SHORT'));
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
    try {
        const credentials = USER_AUTH.validate(req.body);
        const user: User = await UserModel.get(credentials.name);
        const success = await bcrypt.compare(credentials.password, user.password);

        if (success) {
            delete user.password;

            const secret = req.app.get('secret');
            const short = generateToken(TokenType.SHORT, secret, '1d', user);
            const long = generateToken(TokenType.LONG, secret, '30d', { id: user.id });

            res.status(200).send({ short, long });
        } else {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_CREDENTIALS));
        }
    } catch (error) {
        if (error instanceof ApiError && error.errorNumber === ErrorNumber.USER_NOT_FOUND) {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_CREDENTIALS));
        } else {
            next(error);
        }
    }
}

/**
 * Route endpoint `PATCH /api/authenticate` used to authenticate and to generate JWT
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export function renew(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token;
    if (!token) {
        next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_MISSING_JSONWEBTOKEN));
        return;
    }
    const secret = req.app.get('secret');
    jsonwebtoken.verify(token, secret, async (error: any, decoded: any) => {
        if (error) {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_JSONWEBTOKEN, error));
        } else if (decoded.type !== TokenType.LONG) {
            next(ApiError.UNAUTHORIZED(ErrorNumber.AUTHENTICATION_INVALID_JSONWEBTOKEN, 'type !== LONG'));
        } else {
            try {
                const user: User = await UserModel.get(decoded.id);
                delete user.password;

                const short = generateToken(TokenType.SHORT, secret, '1d', user);
                res.status(200).send({ short });
            } catch (error) {
                next(error);
            }
        }
    });
}