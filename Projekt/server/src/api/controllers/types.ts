import { Response, Request, NextFunction } from 'express';
import { Connection, ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';

export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;

        const database: DatabaseController = req.app.get('database');
        const connection: Connection = await database.getConnection();

        await connection.beginTransaction();
        try {
            const typeId = (await database.TYPE_CREATE.executeConnection(connection, body.name)).insertId;

            const query: any = {
                id: typeId,
                fields: body.fields
            };

            const promises: Promise<ObjectResultsets>[] = body.fields.map(function mapper(field: any) {
                return database.TYPE_FIELD_CREATE.executeConnection(connection, [ typeId, field.name, field.type, field.required, field.unique ]);
            });
            const fieldIds = await Promise.all(promises);
            for (let i = 0; i < fieldIds.length; i++) {
                query.fields[i].id = fieldIds[i].insertId;
            }

            await database.CREATE_TYPE_TABLE.execute(query);

            await connection.commit();
        } catch (error) {
            console.error('Inner: ', error);
            await connection.rollback();

            if (error.errno === 1062) {
                next(new ApiError('Conflict', 'The requeste could not be processed because of conflict in the current state of the resource', 409, error.message));
            } else {
                next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
            }
            await connection.end();
            return;
        }
        await connection.end();

    } catch (error) {
        console.error('Outer: ', error);
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        return;
    }
    res.status(200).send({});
}

export function typeGet(req: Request, res: Response, next: NextFunction) {

}

export function typeDelete(req: Request, res: Response, next: NextFunction) {

}