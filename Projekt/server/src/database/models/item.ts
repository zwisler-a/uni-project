import { TypeModel } from './type';
import { DatabaseController } from '../controller';
import { FullType, TypeField, TypeFieldType, Type } from '../../api/models/type';
import { GlobalField } from '../../api/models/global';
import { Item, Field, EmbeddedItem } from '../../api/models/item';
import { ApiError, ErrorNumber } from '../../types';
import { GlobalFieldModel } from './global';
import { SortOrder, Sortable } from '../queries/item';

export interface ItemGetOptions {
    page: number;
    perPage: number;
    orderBy?: string;
    order?: SortOrder;
    searchQuery?: string;
}

/**
 * Database model class for company objects
 * @author Maurice
 */
export class ItemModel {
    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the company model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (ItemModel.database) {
            throw new Error('Already initialized ItemModel');
        }
        ItemModel.database = database;
    }

    private static verifyValues(fields: TypeField[] | GlobalField[], values: Field[], global: boolean): any[] {
        const mapping: any[] = [];

        typeLoop:
        for (const field of fields) {

            // Search value for field
            for (let i = 0; i < values.length; i++) {
                const value = values[i];

                if (value.global === global && value.id === field.id) {
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
                            if (typeof value.value === 'string') {
                                if (field.required && value.value.length === 0) {
                                    throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_LENGTH, field.id);
                                }
                                continue typeLoop;
                            }
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
                                } catch (e) {
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

    private static async getType(companyId: number, typeId: number): Promise<FullType> {
        return {
            ...(await TypeModel.get(typeId)),
            globals: await GlobalFieldModel.get(companyId)
        };
    }

    private static mapGet(type: FullType): (item: any) => Item {
        return (item: any) => {
            const fields: Field[] = [];
            type.fields.forEach((field: TypeField) => {
                const value = item[`field_${field.id}`];

                const itemField: Field = {
                    id: field.id,
                    global: false,
                    value,
                };

                if (field.type === TypeFieldType.boolean && value) {
                    itemField.value = value.readUInt8() === 1;
                } else if (field.type === TypeFieldType.reference) {
                    itemField.reference = item[`field_${field.referenceId}`];
                }

                fields.push(itemField);
            });
            type.globals.forEach((field: GlobalField) => {
                let value = item[`global_${field.id}`];
                if (field.type === TypeFieldType.boolean && value) {
                    value = value.readUInt8() === 1;
                }

                fields.push({
                    id: field.id,
                    global: true,
                    value
                });
            });
            return { typeId: type.id, id: item.id, fields };
        };
    }

    private static async mapChange(type: FullType, typeValues: any[], globalValues: any[]): Promise<Field[]> {
        let fields = await Promise.all(type.fields.map(async function(field: TypeField, index: number) {
            const result: Field = {
                id: field.id,
                value: typeValues[index],
                global: false
            };

            if (result.value && field.type === TypeFieldType.reference) {
                const item = await ItemModel.get(type.companyId, field.reference.typeId, result.value);
                result.reference = item.fields.find(itemField => itemField.id === field.referenceId).value;
            }

            return result;
        }));
        fields = fields.concat(type.globals.map((field: GlobalField, index: number) => {
            return {
                id: field.id,
                value: globalValues[index],
                global: true
            };
        }));
        return fields;
    }

    private static async getFilteredItems(sorter: Sortable<FullType, { id: number, global: boolean }>, searchQuery: string): Promise<Item[]> {
        const items: Item[] = (await ItemModel.database.ITEM.GET.execute(sorter)).map(ItemModel.mapGet(sorter.value));
        return searchQuery ? items.filter((item: Item) => {
            for (const field of item.fields) {
                if (field.value === null) {
                    return;
                }
                return field.value.toString().includes(searchQuery);
            }
        }) : items;
    }

    static async get(companyId: number, typeId: number, id: number): Promise<Item> {
        const type: FullType = await ItemModel.getType(companyId, typeId);

        const items = await ItemModel.database.ITEM.GET_ID.execute(type, [ id ]);
        if (items.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND);
        }
        return ItemModel.mapGet(type)(items.pop());
    }

    static async getAllType(companyId: number, typeId: number, options: ItemGetOptions): Promise<{ total: number, items: EmbeddedItem }> {
        const type: FullType = await ItemModel.getType(companyId, typeId);
        const { page, perPage } = options;

        let orderBy: { id: number, global: boolean };
        if ('orderBy' in options && options.orderBy) {
            let field: any = type.fields.find((field: TypeField) => field.name === options.orderBy);
            if (field) {
                orderBy = { id: field.id, global: false };
            }

            field = type.globals.find((field: GlobalField) => field.name === options.orderBy);
            if (!orderBy && field) {
                orderBy = { id: field.id, global: true };
            }

            if (!orderBy) {
                throw ApiError.NOT_FOUND(ErrorNumber.TYPE_FIELD_NOT_FOUND, options.orderBy);
            }
        }

        let sorter: Sortable<FullType, { id: number, global: boolean }>;
        if (orderBy !== null) {
            sorter = { value: type, sorter: orderBy, order: options.order };
        } else {
            sorter = { value: type };
        }

        let total: number;
        let items: Item[];
        if ('searchQuery' in options) {
            items = (await ItemModel.getFilteredItems(sorter, options.searchQuery));
            total = items.length;

            items = items.slice(page * perPage, page * perPage + perPage);
        } else {
            total = (await ItemModel.database.ITEM.COUNT.execute(type.id)).pop()['COUNT(*)'];
            items = (await ItemModel.database.ITEM.GET_RANGE.execute(sorter, [page * perPage, perPage]))
                .map(ItemModel.mapGet(type));
        }

        return { total, items: new EmbeddedItem([ type ], items) };
    }

    static async getAll(companyId: number, options: ItemGetOptions): Promise<EmbeddedItem> {
        const types: Type[] = await TypeModel.getAll(companyId);
        const globals = await GlobalFieldModel.get(companyId);

        const foundTypes: Type[] = [];
        const items: Item[] = [].concat(...(await Promise.all(types.map(async function(type: Type) {
            const full = { ...type, globals };
            const items = await ItemModel.getFilteredItems({ value: full }, options.searchQuery);
            if (items.length) {
                foundTypes.push(full);
            }
            return items;
        }))));

        return new EmbeddedItem(foundTypes, items);
    }

    /**
     * Fetch an item and returned as proper api response
     */
    static async getAsEmbeddedItem(companyId: number, typeId: number, id: number) {
        const type: FullType = await ItemModel.getType(companyId, typeId);

        const items = await ItemModel.database.ITEM.GET_ID.execute(type, [id]);
        if (items.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND);
        }
        return new EmbeddedItem([type], [ItemModel.mapGet(type)(items.pop())]);
    }

    // TODO check if company exists
    static async create(companyId: number, typeId: number, fields: Field[]): Promise<EmbeddedItem> {
        const type: FullType = await ItemModel.getType(companyId, typeId);

        let id = 0;
        await ItemModel.database.beginTransaction(async function(connection) {
            const typeValues = ItemModel.verifyValues(type.fields, fields, false);
            const globalValues = ItemModel.verifyValues(type.globals, fields, true);

            id = (await ItemModel.database.ITEM.CREATE.executeConnection(connection, type, typeValues)).insertId;
            await ItemModel.database.ITEM.CREATE_GLOBAL.executeConnection(connection, type, [ type.id, id, ...globalValues ]);

            fields = await ItemModel.mapChange(type, typeValues, globalValues);
        });

        return new EmbeddedItem([ type ], [ { typeId, id, fields } ]);
    }

    static async update(companyId: number, typeId: number, id: number, fields: Field[]): Promise<EmbeddedItem> {
        const type: FullType = await ItemModel.getType(companyId, typeId);

        await ItemModel.database.beginTransaction(async function(connection) {
            const typeValues = ItemModel.verifyValues(type.fields, fields, false);
            const globalValues = ItemModel.verifyValues(type.globals, fields, true);

            const affectedRows = (await ItemModel.database.ITEM.UPDATE.executeConnection(connection, type, [ ...typeValues, id ])).affectedRows;
            if (affectedRows === 0) {
                throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND);
            }
            await ItemModel.database.ITEM.UPDATE_GLOBAL.executeConnection(connection, type, [ ...globalValues, type.id, id ]);

            fields = await ItemModel.mapChange(type, typeValues, globalValues);
        });

        return new EmbeddedItem([ type ], [ { typeId, id, fields } ]);
    }

    static async delete(companyId: number, typeId: number, id: number): Promise<void> {
        // Throws error if type doesn't exist
        await TypeModel.get(typeId);

        await ItemModel.database.beginTransaction(async function(connection) {
            const affectedRows = (await ItemModel.database.ITEM.DELETE_GLOBAL.executeConnection(connection, companyId, [ typeId, id ])).affectedRows;
            if (affectedRows === 0) {
                throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND);
            }

            (await ItemModel.database.ITEM.DELETE.executeConnection(connection, typeId, [ id ]));
        });
    }
}