import { Response, Request, NextFunction } from 'express';
import { ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { OldApiError, ApiError } from '../../types';
import { Type, TypeField, TypeFieldType } from '../models/type';
import { TypeModel } from '../../database/models/type';

/**
 * Route endpoint `POST /api/types`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const type: Type = req.body;
        const database: DatabaseController = req.app.get('database');
        const result: Type = await TypeModel.create(database, type);
        res.status(200).send(result);
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            if (error.errno === 1062) {
                next(new OldApiError('Conflict', 'The requeste could not be processed because of conflict in the current state of the resource', 409, error.message));
            } else {
                next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
            }
        }
        console.error(error);
    }
}

/**
 * Route endpoint `GET /api/types/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeGet(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        const database: DatabaseController = req.app.get('database');
        const type: Type = await TypeModel.get(database, id);
        res.status(200).send(type);
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        }
        console.error(error);
    }
}

/**
 * Route endpoint `GET /api/types`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeGetAll(req: Request, res: Response, next: NextFunction) {
    // TODO impl into TypeModel
    try {
        const database: DatabaseController = req.app.get('database');
        const types: Type[] = await database.TYPE_GET.execute();

        for (const type of types) {
            type.fields = (await database.TYPE_FIELD_GET_TYPEID.execute(type.id)).map((row: any) => {
                delete row.typeId;
                row.required = row.required.readUInt8() === 1;
                row.unique = row.unique.readUInt8() === 1;
                return row as TypeField;
            });
        }

        res.status(200).send(types);
    } catch (error) {
        next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        // console.error(error);
    }
}

/**
 * Route endpoint `PATCH /api/types/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        let type: Type = req.body;
        const database: DatabaseController = req.app.get('database');
        type = await TypeModel.update(database, id, type);

        res.status(200).send(type);
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        }
        console.error(error);
    }
}

/**
 * Route endpoint `DELETE /api/types/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const id: number = req.params.id;
        const database: DatabaseController = req.app.get('database');
        await TypeModel.delete(database, id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        }
        console.error(error);
    }
}