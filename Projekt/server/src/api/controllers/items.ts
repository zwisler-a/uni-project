import { Response, Request, NextFunction } from 'express';

import { DatabaseController } from '../../database/controller';
import { ApiError, ErrorNumber } from '../../types';
import { Type } from '../models/type';
import { Item, Field } from '../models/item';
import { TypeModel } from '../../database/models/type';

/**
 * Checks the integrity of all values based on a type and maps them for SQL calls
 * @param type Type to check against
 * @param values List of values to check
 * @param mapping Remapped version of values based on the field order of a type
 * @throws {@link ApiError} if item's values don't match type
 */
function verifyValues(type: Type, values: Field[]): any[] {
    const mapping: any[] = [];

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

                // If field is not required and value is null skip checks
                if (!field.required && value.value == null) {
                    continue typeLoop;
                }

                // Check if value is valid
                switch (field.type) {
                    case 'string':
                    case 'color':
                        if (typeof value.value === 'string' && value.value.length > 0)
                            continue typeLoop;
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_TYPE, field.id);
                    case 'number':
                        if (typeof value.value === 'number')
                            continue typeLoop;
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_TYPE, field.id);
                    case 'boolean':
                        if (typeof value.value === 'boolean')
                            continue typeLoop;
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_TYPE, field.id);
                    case 'date':
                        if (typeof value.value === 'string') {
                            try {
                                const date = new Date(value.value);
                                mapping[mapping.length - 1] = date;
                            } catch {
                                throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_DATE_FORMAT, field.id);
                            }
                            continue typeLoop;
                        }
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_TYPE, field.id);
                    case 'reference':
                        // A reference should be unsigned
                        if (typeof value.value === 'number' && value.value > 0)
                            continue typeLoop;
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_TYPE, field.id);
                }
            }
        }

        // A required field is null
        if (field.required) {
            throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_MISSING, field.id);
        } else {
            // If field isn't required and cannot be found default to null
            mapping.push(null);
        }
    }
    return mapping;
}

/**
 * Route endpoint `GET /api/items/:type`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemGetList(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const query: any = req.query;

        let page = 0;
        if ('page' in query) {
            page = parseInt(query.page);
            if (isNaN(page) || page < 0) {
                throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_NUMBER_FORMAT, 'page');
            }
        }

        let perPage = 25;
        if ('per_page' in query) {
            perPage = parseInt(query.per_page);
            if (isNaN(perPage) || perPage < 1 || perPage > 100) {
                throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_NUMBER_FORMAT, 'per_page');
            }
        }

        // TODO parse searchBy
        let search = 0;
        if ('searchBy' in query) {
            search = parseInt(query.searchBy);
            if (isNaN(search)) {
                next(OldApiError.BAD_REQUEST);
                return;
            }
        }

        // TODO parse order is string ['asc', 'desc']
        let order = '';
        if ('orderBy' in query) {
            order = query.orderBy;
            if ( order !== 'asc' && order !== 'desc') {
                next(OldApiError.BAD_REQUEST);
                return;
            }
        }

        const database: DatabaseController = req.app.get('database');
        const type: Type = await TypeModel.get(typeId);
        const total: number = (await database.ITEM_GET_COUNT.execute(type)).pop()['COUNT(*)'];

        const totalPages = Math.ceil(total / perPage);
        res.set('X-Total', total.toString());
        res.set('X-Total-Pages', totalPages.toString());
        res.set('X-Per-Page', perPage.toString());
        res.set('X-Page', page.toString());
        res.set('X-Prev-Page', Math.max(0, page - 1).toString());
        res.set('X-Next-Page', Math.min(totalPages, page + 1).toString());

        if (page * perPage > total) {
            throw ApiError.BAD_REQUEST(ErrorNumber.PAGINATION_OUT_OF_BOUNDS, { index: page * perPage, total });
        }

        // TODO is field in type

        const items: Item[] = (await database.ITEM_GET.execute(type, [page * perPage, perPage]))
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
        next(error);
    }
}

/**
 * Route endpoint `POST /api/items/:type`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const fields: Field[] = req.body;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await TypeModel.get(typeId);

        // TODO Remove 1. arg, this should later be the company currently there is only one
        const values = verifyValues(type, fields.slice());
        values.unshift(1);

        const id: number = (await database.ITEM_CREATE.execute(type, values)).insertId;

        // TODO Remap mapping to field for output even when field is missing
        res.status(200).send(new EmbeddedItem([ type ], [ { typeId: type.id, id, fields } ]));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/items/:type/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemGet(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await TypeModel.get(typeId);

        const items = await database.ITEM_GET_ID.execute(type, id);
        if (items.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND);
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

        res.status(200).send(new EmbeddedItem([ type ], [ { typeId: type.id, id, fields } ]));
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `PATCH /api/items/:type/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;
        const fields: Field[] = req.body;

        const database: DatabaseController = req.app.get('database');
        const type: Type = await TypeModel.get(typeId);

        // TODO Remove 1. arg, this should later be the company currently there is only one
        const values = verifyValues(type, fields.slice());
        values.unshift(1);

        // Need to push the where for sql to know what to update
        values.push(id);

        const affectedRows = (await database.ITEM_UPDATE.execute(type, values)).affectedRows;
        if (affectedRows > 0) {
            res.status(200).send(new EmbeddedItem([ type ], [ { typeId: type.id, id, fields } ]));
        } else {
            next(ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND));
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `DELETE /api/items/:type/:id`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemDelete(req: Request, res: Response, next: NextFunction) {
    try {
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        const database: DatabaseController = req.app.get('database');
        // TODO use exist instead but do number check
        const type: Type = await TypeModel.get(typeId);

        const affectedRows = (await database.ITEM_DELETE.execute(type, id)).affectedRows;
        if (affectedRows > 0) {
            res.status(204).send();
        } else {
            next(ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND));
        }
    } catch (error) {
        next(error);
    }
}

/**
 * A combine object of Types and Items
 */
export class EmbeddedItem {
    /** The Types need to understand all items in the items[] */
    types: Type[];
    /** List of all items */
    items: Item[];

    /**
     * Creates a new EmbeddedItem
     * @param types All Types used by the given Items
     * @param items List of Items
     */
    constructor(types: Type[], items: Item[]) {
        this.types = types;
        this.items = items;
    }
}