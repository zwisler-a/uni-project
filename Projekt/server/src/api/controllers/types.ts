import { Response, Request, NextFunction } from 'express';

import { DatabaseController } from '../../database/controller';
import { Type, TypeField, TYPE } from '../models/type';
import { TypeModel } from '../../database/models/type';

/**
 * Route endpoint `POST /api/types`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const type: Type = TYPE.validate(req.body);
        const result: Type = await TypeModel.create(type);
        res.status(200).send(result);
    } catch (error) {
        next(error);
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
        const type: Type = await TypeModel.get(id);
        res.status(200).send(type);
    } catch (error) {
        next(error);
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
        next(error);
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
        let type: Type = TYPE.validate(req.body);

        type = await TypeModel.update(id, type);
        res.status(200).send(type);
    } catch (error) {
        next(error);
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
        await TypeModel.delete(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}