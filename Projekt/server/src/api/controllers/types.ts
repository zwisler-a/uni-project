import { Response, Request, NextFunction } from 'express';
import { ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { OldApiError } from '../../types';
import { Type, TypeField, TypeFieldType } from '../models/type';

/**
 * Route endpoint `POST /api/types`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const type: Type = req.body;
        let query: any;

        const database: DatabaseController = req.app.get('database');

        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference &&
                (await database.TYPE_GET_ID.execute(field.referenceId)).length === 0) {
                next(new OldApiError('Invalid reference', 'The referenced type couldn\'t be found', 404, field));
                return;
            }
        }

        await database.beginTransaction(async function(connection) {
            const typeId = (await database.TYPE_CREATE.executeConnection(connection, type.name)).insertId;

            query = {
                id: typeId,
                name: type.name,
                fields: type.fields
            };

            const promises: Promise<ObjectResultsets>[] = type.fields.map(function mapper(field: TypeField) {
                const reference = field.type === TypeFieldType.reference ? field.referenceId : null;
                return database.TYPE_FIELD_CREATE.executeConnection(connection, [ typeId, field.name, field.type, field.required, field.unique, reference ]);
            });
            const fieldIds = await Promise.all(promises);
            for (let i = 0; i < fieldIds.length; i++) {
                query.fields[i].id = fieldIds[i].insertId;
            }

            await database.ITEM_TABLE_CREATE.execute(query);
        });

        res.status(200).send(query);
    } catch (error) {
        if (error.errno === 1062) {
            next(new OldApiError('Conflict', 'The requeste could not be processed because of conflict in the current state of the resource', 409, error.message));
        } else {
            next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        }
        // console.error(error);
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
        const id = req.params.id;
        const database: DatabaseController = req.app.get('database');

        const types = await database.TYPE_GET_ID.execute(id);
        if (types.length === 0) {
            next(OldApiError.NOT_FOUND);
            return;
        }

        const type: Type = types.pop();
        type.fields = (await database.TYPE_FIELD_GET_TYPEID.execute(id)).map((row: any) => {
            delete row.typeId;
            row.required = row.required.readUInt8() === 1;
            row.unique = row.unique.readUInt8() === 1;
            return row as TypeField;
        });

        res.status(200).send(type);
    } catch (error) {
        next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        // console.error(error);
    }
}

/**
 * Route endpoint `GET /api/types`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function typeGetAll(req: Request, res: Response, next: NextFunction) {
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
        const typeId: number = req.params.id;
        const database: DatabaseController = req.app.get('database');
    } catch (error) {
        next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        // console.error(error);
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
        const typeId: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        const references: TypeField[] = await database.TYPE_FIELD_GET_REFERENCEID.execute(typeId);

        await database.beginTransaction(async function(connection) {
            for (const reference of references) {
                await database.ITEM_TABLE_FK_DROP.executeConnection(connection, reference);
                await database.ITEM_TABLE_FIELD_DROP.executeConnection(connection, reference);
            }

            await database.ITEM_TABLE_DROP.executeConnection(connection, typeId);
            await database.TYPE_DELTE.executeConnection(connection, typeId);
        });

        res.status(204).send();
    } catch (error) {
        next(new OldApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        // console.error(error);
    }
}