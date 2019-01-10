import { Response, Request, NextFunction } from 'express';
import { Connection } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';

export async function typeCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        /*const database: DatabaseController = req.app.get('database');
        const connection: Connection = await database.getConnection();

        await connection.beginTransaction();
        try {
            const typeId = (await database.TYPE_CREATE.executeConnection(connection, body.name)).insertId;

            const promises = [];
            for (let i = 0; i < body.fields.length; i++) {
                const field = body.fields[i];
                promises.push(database.TYPE_FIELD_CREATE.executeConnection(connection, [ typeId, field.name, field.type, field.required, field.unique ]));
            }
            await Promise.all(promises);

            await connection.commit();
        } catch (error) {
            console.dir(error);
            await connection.rollback();

            if (error.errno === 1062) {
                next(new ApiError('Conflict', 'The requeste could not be processed because of conflict in the current state of the resource', 409, error.message));
            } else {
                next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
            }
            return;
        }
        connection.end();*/

    } catch (error) {
        console.dir(error);
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        return;
    }
    res.status(200).send({});
}

export function typeGet(req: Request, res: Response, next: NextFunction) {

}

export function typeDelete(req: Request, res: Response, next: NextFunction) {

}