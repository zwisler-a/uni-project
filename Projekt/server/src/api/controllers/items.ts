import { Response, Request, NextFunction } from 'express';

import { ApiError, ErrorNumber } from '../../types';
import { Field, ITEM } from '../models/item';
import { SortOrder } from '../../database/queries/item';
import { ItemModel, ItemGetOptions } from '../../database/models/item';
import { TypeField } from '../models/type';

function parseOptions(query: any): ItemGetOptions {
    let page = 0;
    if ('page' in query) {
        page = parseInt(query.page);
        if (isNaN(page) || page < 0) {
            throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_NUMBER_FORMAT, 'page');
        }
    }

    let perPage = 25;
    if ('perPage' in query) {
        perPage = parseInt(query.perPage);
        if (isNaN(perPage) || perPage < 1 || perPage > 100) {
            throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_NUMBER_FORMAT, 'perPage');
        }
    }

    let order: SortOrder = SortOrder.DESC;
    if ('order' in query) {
        order = query.order.toUpperCase();
        if (!(order in SortOrder)) {
            throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_URL_ENUM, 'order');
        }
        order = SortOrder[order];
    }

    return {
        page, perPage,
        orderBy: query.orderBy,
        order,
        searchQuery: query.searchQuery
    };
}

/**
 * Route endpoint `GET /api/items/:type`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemGetList(req: Request, res: Response, next: NextFunction) {
    try {
        const companyId: number = req.params.user.companyId;
        const typeId: number = req.params.type;

        const options = parseOptions(req.query);
        const { page, perPage } = options;

        const { total, items } = await ItemModel.getAllType(companyId, typeId, options);

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

        res.status(200).send(items);
    } catch (error) {
        next(error);
    }
}

/**
 * Route endpoint `GET /api/items`
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */
export async function itemGetGlobalList(req: Request, res: Response, next: NextFunction) {
    try {
        const companyId: number = req.params.user.companyId;

        const options = parseOptions(req.query);
        const { page, perPage } = options;

        const items = await ItemModel.getAll(companyId, options);
        const orderBy: string[] = [];

        for (const type of items.types) {
            const field = type.fields.find((field: TypeField) => field.name === req.query.orderBy);
            if (field !== undefined) {
                orderBy.push(field.id.toString());
            }
        }

        if (orderBy.length !== 0) {
            const mul = options.order === SortOrder.ASC ? 1 : -1;

            // TODO fix the damn search
            items.items = items.items.map((item: any) => {
                item.sort = item.fields.reduce((object: any, { id, value }: any) => {
                    if (typeof value === 'boolean') {
                        value = value ? '1' : '2';
                    } else if (value !== null) {
                        value = value.toString().toUpperCase();
                    } else {
                        value = '0';
                    }
                    object[id] = value;
                    return object;
                }, {});
                return item;
            })
            .sort(({ sort: a }: any, { sort: b }: any) => {
                for (const id of orderBy) {
                    if (id in a) {
                        const valueA = a[id];

                        for (const id of orderBy) {
                            if (id in b) {
                                const valueB = b[id];
                                if (valueA < valueB) {
                                    return -1 * mul;
                                }
                                if (valueA > valueB) {
                                    return 1 * mul;
                                }
                                return 0;
                            }
                        }

                        return -1;
                    } else if (id in b) {
                        return 1;
                    }
                }
                return 0;
            })
            .map((item: any) => {
                delete item.sort;
                return item;
            });
        }

        const total = items.items.length;
        items.items = items.items.slice(page * perPage, page * perPage + perPage);
        const totalPages = Math.ceil(total / perPage);
        res.set('X-Total', total.toString());
        res.set('X-Total-Pages', totalPages.toString());
        res.set('X-Per-Page', perPage.toString());
        res.set('X-Page', page.toString());
        res.set('X-Prev-Page', Math.max(0, page - 1).toString());
        res.set('X-Next-Page', Math.min(totalPages, page + 1).toString());

        if (page * perPage > 50) {
            throw ApiError.BAD_REQUEST(ErrorNumber.PAGINATION_OUT_OF_BOUNDS, { index: page * perPage, total });
        }

        res.status(200).send(items);
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
        const companyId: number = req.params.user.companyId;
        const typeId: number = req.params.type;
        const fields: Field[] = ITEM.validate(req.body);

        res.status(200).send(await ItemModel.create(companyId, typeId, fields));
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
        const companyId: number = req.params.user.companyId;
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        res.status(200).send(await ItemModel.get(companyId, typeId, id));
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
        const companyId: number = req.params.user.companyId;
        const typeId: number = req.params.type;
        const id: number = req.params.id;
        const fields: Field[] = ITEM.validate(req.body);

        res.status(200).send(await ItemModel.update(companyId, typeId, id, fields));
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
        const companyId: number = req.params.user.companyId;
        const typeId: number = req.params.type;
        const id: number = req.params.id;

        await ItemModel.delete(companyId, typeId, id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
