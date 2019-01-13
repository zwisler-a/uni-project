import { Response, Request, NextFunction } from 'express';
import { ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';
import { Type, TypeField, TypeFieldType } from '../models/type';

export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const type: Type = req.body;
        let query: any;

        const database: DatabaseController = req.app.get('database');

        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference &&
                (await database.TYPE_GET_ID.execute(field.referenceId)).length === 0) {
                next(new ApiError('Invalid reference', 'The referenced type couldn\'t be found', 404, field));
                return;
            }
        }

        await database.beginTransaction(async function(connection) {
            const typeId = (await database.TYPE_CREATE.executeConnection(connection, type.name)).insertId;

            query = {
                id: typeId,
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

            await database.CREATE_TYPE_TABLE.execute(query);
        });

        res.status(200).send(query);
    } catch (error) {
        if (error.errno === 1062) {
            next(new ApiError('Conflict', 'The requeste could not be processed because of conflict in the current state of the resource', 409, error.message));
        } else {
            next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        }
        console.error(error);
    }
}

export async function typeGet(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const database: DatabaseController = req.app.get('database');

        const type: Type = (await database.TYPE_GET_ID.execute(id)).pop();
        type.fields = (await database.TYPE_FIELD_GET_TYPEID.execute(id)).map((row: any) => {
            delete row.typeId;
            row.required = row.required.readUInt8() === 1;
            row.unique = row.unique.readUInt8() === 1;
            return row as TypeField;
        });

        res.status(200).send(type);
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
    }
}

export async function typeGetAll(req: Request, res: Response, next: NextFunction) {
    try {
        const database: DatabaseController = req.app.get('database');
        const types: Type[]  = await database.TYPE_GET.execute();
        res.status(200).send(types);
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
    }
}

export async function typeDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        const references: TypeField[] = await database.TYPE_FIELD_GET_REFERENCEID.execute(typeId);

        database.beginTransaction(async function(connection) {
            for (const reference of references) {

            }
        });
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
    }
}