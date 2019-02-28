import { Response, Request, NextFunction } from 'express';

import { Role, ROLE, Permission } from '../models/role';
import { User } from '../models/user';
import { RoleModel } from '../../database/models/role';
import { ApiError, ErrorNumber } from '../../types';

export function verifyPermission(permission: Permission, typeFieldName?: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: User = req.params.user;
        if (checkPermission(user, permission, typeFieldName ? req.params[typeFieldName] : undefined)) {
            next();
            return;
        }
        next(ApiError.FORBIDDEN(ErrorNumber.AUTHENTICATION_INSUFFICIENT_PERMISSION, permission));
    };
}

export function checkPermission(user: User, permission: Permission, typeId?: number) {
    for (const role of user.roles as Role[]) {
        if ((role.permission & permission) !== 0) {
            return true;
        }

        if (typeof typeId !== 'undefined' && permission <= Permission.TYPE_EDIT) {
            const type = typeId.toString();
            if (type in role.types && (role.types[type] & permission) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Route endpoint `POST /api/roles`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function roleCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const role: Role = ROLE.validate(req.body);
        role.companyId = req.params.companyId;

        res.status(200).send(await RoleModel.create(role));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/roles/`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function roleGetList(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).send(await RoleModel.getAll(req.params.companyId));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/roles/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function roleGet(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).send(await RoleModel.get(req.params.id));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `PATCH /api/roles/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function roleUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const role: Role = ROLE.validate(req.body);
        res.status(200).send(await RoleModel.update(req.params.id, role));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `DELETE /api/roles/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function roleDelete(req: Request, res: Response, next: NextFunction) {
    try {
        await RoleModel.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}