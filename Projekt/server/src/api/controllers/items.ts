import { Response, Request, NextFunction } from 'express';
import { ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';
import { Type, TypeField } from '../models/type';
import { Item, Field } from '../models/item';

async function getTypeFields(database: DatabaseController, id: number): Promise<Type> {
    try {
        const type: Type = (await database.TYPE_GET.execute(id)).pop();
        type.fields = (await database.TYPE_FIELD_GET_TYPEID.execute(id)).map((row: any) => {
            delete row.typeId;
            row.required = row.required.readUInt8() === 1;
            row.unique = row.unique.readUInt8() === 1;
            return row as TypeField;
        });
        return type;
    } catch (error) {
        throw error;
    }
}

function checkType(type: Type, values: Field[]) {
    typeLoop:
    for (const field of type.fields) {

        for (let i = 0; i < values.length; i++) {
            const value = values[i];

            if (value.id === field.id) {
                // Remove already check values for speed
                values.splice(i--, 1);

                // If field is not required and value is false skip checks
                if (!field.required && !value.value) {
                    continue typeLoop;
                }

                // Check if value is valid
                switch (field.type) {
                    case 'string':
                    case 'color':
                        if (typeof value.value === 'string' && value.value.length > 0)
                            continue typeLoop;
                        return field;
                    case 'number':
                        if (typeof value.value === 'number')
                            continue typeLoop;
                        return field;
                    case 'boolean':
                        if (typeof value.value === 'boolean')
                            continue typeLoop;
                        return field;
                    case 'date':
                        if (typeof value.value === 'string') {
                            // Do a very simple format check
                            const groups = /\d\d\d\d-\d\d-\d\d/.exec(value.value);
                            if (groups === null || groups.length === 0 || groups[0] !== value.value) {
                                return field;
                            }
                            continue typeLoop;
                        }
                        return field;
                    case 'reference':
                        // A reference should be unsigned
                        if (typeof value.value === 'number' && value.value > 0)
                            continue typeLoop;
                        return field;
                }
            }
        }

        // A required field is null
        if (field.required) {
            return field;
        }
    }
    return null;
}

export async function itemCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const fields: Field[] = req.body;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId);

        const values: any[] = fields.map(field => field.value);
        // TODO Remove, this should later be the company currently there is only one
        values.unshift(1);

        const errors: any = checkType(type, fields);
        if (errors !== null) {
            next(new ApiError('Bad Request', 'The request contains invalid values', 400, errors));
            return;
        }

        const itemId: number = (await database.ITEM_CREATE.execute(type, values)).insertId;

        res.status(200).send({
            typeId,
            id: itemId,
            fields
        });
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export async function itemGet(req: Request, res: Response, next: NextFunction) {

}

export async function itemUpdate(req: Request, res: Response, next: NextFunction) {

}

export async function itemDelete(req: Request, res: Response, next: NextFunction) {

}