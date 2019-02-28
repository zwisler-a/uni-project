import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User, USER_CREATE, USER_PATCH } from '../models/user';
import { UserModel } from '../../database/models/user';
import { checkPermission } from './roles';
import { Permission } from '../models/role';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Route endpoint `POST /api/users`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function userCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const user: User = USER_CREATE.validate(req.body);
        user.companyId = req.params.companyId;
        user.name = user.name.trim();
        user.password = await bcrypt.hash(user.password, 12);

        res.status(200).send(await UserModel.create(user));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/users/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function userGet(req: Request, res: Response, next: NextFunction) {
    try {
        // Can get himself but only other users with permission
        if (req.params.user.id !== req.params.id && !checkPermission(req.params.user, Permission.LOCAL_ADMIN)) {
            throw ApiError.FORBIDDEN(ErrorNumber.AUTHENTICATION_INSUFFICIENT_PERMISSION, Permission.LOCAL_ADMIN);
        }

        const user: User = await UserModel.get(req.params.id);
        delete user.password;

        // Should only be able to get user from own company
        if (user.companyId !== req.params.companyId) {
            throw ApiError.FORBIDDEN(ErrorNumber.AUTHENTICATION_INVALID_COMPANY);
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/users/`
 * Fetches all users
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function userGetList(req: Request, res: Response, next: NextFunction) {
    try {
        const users: User[] = await UserModel.getAll(req.params.companyId);
        users.forEach(user => {
            delete user.password;
        });
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `PATCH /api/users/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function userUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        let user: User = USER_PATCH.validate(req.body);

        // Can edit himself but only other users with permission
        if (req.params.user.id !== req.params.id && !checkPermission(req.params.user, Permission.LOCAL_ADMIN)) {
            throw ApiError.FORBIDDEN(ErrorNumber.AUTHENTICATION_INSUFFICIENT_PERMISSION, Permission.LOCAL_ADMIN);
        }

        if ('name' in user) {
            user.name = user.name.trim();
        }
        if ('password' in user) {
            user.password = await bcrypt.hash(user.password, 12);
        }

        user = await UserModel.update(req.params.id, user, req.params.companyId);
        delete user.password;
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `DELETE /api/users/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function userDelete(req: Request, res: Response, next: NextFunction) {
    try {
        await UserModel.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}