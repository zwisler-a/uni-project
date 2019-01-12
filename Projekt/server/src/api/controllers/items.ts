import { Response, Request, NextFunction } from 'express';
import { ObjectResultsets } from 'mariadb';

import { DatabaseController } from '../../database/controller';
import { ApiError } from '../../types';
import { Type, TypeField } from '../models/type';
import { Item, Field } from '../models/item';

async function getTypeFields(database: DatabaseController, id: number, fields: boolean): Promise<Type> {
    try {
        const type: Type = (await database.TYPE_GET.execute(id)).pop();
        if (fields) {
            type.fields = (await database.TYPE_FIELD_GET_TYPEID.execute(id)).map((row: any) => {
                delete row.typeId;
                row.required = row.required.readUInt8() === 1;
                row.unique = row.unique.readUInt8() === 1;
                return row as TypeField;
            });
        } else {
            type.fields = [];
        }
        return type;
    } catch (error) {
        throw error;
    }
}

function checkType(type: Type, values: Field[], mapping: any[]) {
    typeLoop:
    for (const field of type.fields) {

        // Search value for field
        for (let i = 0; i < values.length; i++) {
            const value = values[i];

            if (value.id === field.id) {
                // Remove already check values for speed
                values.splice(i--, 1);

                // Add value to mapping for correct insert order
                mapping.push(value.value);

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
                            try {
                                const date = new Date(value.value);
                                mapping[mapping.length - 1] = date;
                            } catch {
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

export async function itemGetList(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const query: any = req.query;

        let page = 0;
        if ('page' in query) {
            page = parseInt(query.page);
            if (isNaN(page) || page < 0) {
                next(ApiError.BAD_REQUEST);
                return;
            }
        }

        let perPage = 25;
        if ('per_page' in query) {
            perPage = parseInt(query.per_page);
            if (isNaN(perPage) || perPage < 1 || perPage > 100) {
                next(ApiError.BAD_REQUEST);
                return;
            }
        }

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId, true);
        const total: number = (await database.ITEM_GET_TOTAL.execute(type)).pop()['COUNT(*)'];

        const totalPages = Math.ceil(total / perPage);
        res.set('X-Total', total.toString());
        res.set('X-Total-Pages', totalPages.toString());
        res.set('X-Per-Page', perPage.toString());
        res.set('X-Page', page.toString());
        res.set('X-Prev-Page', Math.max(0, page - 1).toString());
        res.set('X-Next-Page', Math.min(totalPages, page + 1).toString());

        if (page * perPage > total) {
            next(ApiError.BAD_REQUEST);
            return;
        }

        const items: Item[] = (await database.ITEM_GET_LIST.execute(type, [page * perPage, perPage]))
            .map((item: any) => {
                const fields: Field[] = [];
                for (let i = 0; i < type.fields.length; i++) {
                    const field = type.fields[i];
                    let value = item[`field_${field.id}`];
                    if (field.type === 'boolean') {
                        value = value.readUInt8() === 1;
                    }
                    fields.push({ id: field.id, value });
                }
                return { typeId, id: item.id, fields };
            });

        res.status(200).send(new EmbeddedItem([ type ], items));
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export async function itemCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const fields: Field[] = req.body;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId, true);

        // TODO Remove 1. arg, this should later be the company currently there is only one
        const values: any[] = [ 1 ];

        const errors: any = checkType(type, fields.slice(), values);
        if (errors !== null) {
            next(new ApiError('Bad Request', 'The request contains invalid values', 400, errors));
            return;
        }

        const id: number = (await database.ITEM_CREATE.execute(type, values)).insertId;

        res.status(200).send(new EmbeddedItem([ type ], [ { typeId, id, fields } ]));
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export async function itemGet(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId, true);

        const items = await database.ITEM_GET.execute(type, id);
        if (items.length === 0) {
            next(ApiError.NOT_FOUND);
            return;
        }
        const item = items.pop();

        const fields = [];
        for (let i = 0; i < type.fields.length; i++) {
            const field = type.fields[i];
            let value = item[`field_${field.id}`];
            if (field.type === 'boolean') {
                value = value.readUInt8() === 1;
            }
            fields.push({ id: field.id, value });
        }

        res.status(200).send(new EmbeddedItem([ type ], [ { typeId, id, fields } ]));
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export async function itemUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;
        const fields: Field[] = req.body;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId, true);

        // TODO Remove 1. arg, this should later be the company currently there is only one
        const values: any[] = [ 1 ];

        const errors: any = checkType(type, fields.slice(), values);
        if (errors !== null) {
            next(new ApiError('Bad Request', 'The request contains invalid values', 400, errors));
            return;
        }

        // Need to push the where for sql to know what to update
        values.push(id);

        const affectedRows = (await database.ITEM_UPDATE.execute(type, values)).affectedRows;
        if (affectedRows > 0) {
            res.status(200).send(new EmbeddedItem([ type ], [ { typeId, id, fields } ]));
        } else {
            next(ApiError.NOT_FOUND);
        }
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export async function itemDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await getTypeFields(database, typeId, false);

        const affectedRows = (await database.ITEM_UPDATE.execute(type, id)).affectedRows;
        if (affectedRows > 0) {
            res.status(204).send();
        } else {
            next(ApiError.NOT_FOUND);
        }
    } catch (error) {
        next(new ApiError('Internal Server Error', 'Request failed due to unexpected error', 500, error));
        console.error(error);
    }
}

export class EmbeddedItem {
    types: Type[];
    items: Item[];

    constructor(types: Type[], items: Item[]) {
        this.types = types;
        this.items = items;
    }
}