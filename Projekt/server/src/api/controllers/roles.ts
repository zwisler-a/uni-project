import { Response, Request, NextFunction } from 'express';

import { Role, ROLE } from '../models/role';
import { RoleModel } from '../../database/models/role';

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