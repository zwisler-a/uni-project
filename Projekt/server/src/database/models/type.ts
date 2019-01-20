import { Cache } from './cache';
import { DatabaseController } from '../controller';
import { Type, TypeField, TypeFieldType } from '../../api/models/type';
import { ApiError, ErrorNumber } from '../../types';

export class TypeModel {
    private static cache = new Cache<Type>({
        stdTTL: 3600,
        checkperiod: 600
    });

    private static async fetchFields(database: DatabaseController, id: number): Promise<TypeField[]> {
        return (await database.TYPE_FIELD_GET_TYPEID.execute(id)).map((row: any) => {
            delete row.typeId;
            row.required = row.required.readUInt8() === 1;
            row.unique = row.unique.readUInt8() === 1;
            return row as TypeField;
        });
    }

    private static async fetchType(database: DatabaseController, id: number): Promise<Type> {
        const types = await database.TYPE_GET_ID.execute(id);
        if (types.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.TYPE_NOT_FOUND);
        }

        const type: Type = types.pop();
        type.fields = await TypeModel.fetchFields(database, id);

        return type;
    }

    /**
     * Check if a type exists
     * @param database current DatabaseContoller instance
     * @param id id of the type
     * @returns Promise that resolves whether the type exists
     */
    private static async exists(database: DatabaseController, id: number): Promise<boolean> {
        // Use a faster query (smaller answer) for exists since we don't care about data
        return (await database.TYPE_EXISTS_ID.execute(id)).length > 0;
    }

    /**
     * Gets a type from cache or the network
     * @param database current DatabaseContoller instance
     * @param id id of the type
     * @returns Promise that resolves requested type
     */
    static async get(database: DatabaseController, id: number): Promise<Type> {
        const key = id.toString();

        // Check cache
        let type: Type = await TypeModel.cache.get(key);
        if (type !== undefined) {
            // Fetch type
            type = await TypeModel.fetchType(database, id);
            await TypeModel.cache.set(key, type);
        } else {
            // Reset ttl after get
            TypeModel.cache.ttl(key);
        }
        return type;
    }

    static async create(database: DatabaseController, fields: TypeField[]): Promise<void> {

    }

    static async update(database: DatabaseController, id: number, type: Type) {
        const fields = type.fields;
        const old: Type = await TypeModel.get(database, id);

        // Check if all referenced types exist
        // TODO do other integrity checks
        for (const field of fields) {
            if (field.type === TypeFieldType.reference && !TypeModel.exists(database, field.referenceId)) {
                throw ApiError.NOT_FOUND(ErrorNumber.TYPE_REFERENCE_NOT_FOUND, field.referenceId);
            }
        }

        // TODO Update type table

        database.beginTransaction(async function(connection) {
            let update = false;
            oldLoop:
            for (const oldField of old.fields) {
                for (let i = 0; i < fields.length; i++) {
                    const field = fields[i];
                    if (oldField.id === field.id) {
                        fields.splice(i, 1);
                        update = false;

                        // TODO bring in this order
                        // 1. DROP FK
                        // 2. UPDATE FK
                        // 3. UPDATE TYPE
                        // 4. CREATE FK
                        // 5. UPDATE UI

                        // Delete/Create/Edit foreign key
                        if (oldField.type === TypeFieldType.reference && field.type !== TypeFieldType.reference) {
                            await database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                            update = true;
                        } else if (oldField.type !== TypeFieldType.reference && field.type === TypeFieldType.reference) {
                            // TODO do user input check + does type exist
                            await database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                            update = true;
                        } else if (oldField.type === TypeFieldType.reference && field.type === TypeFieldType.reference
                            && oldField.referenceId !== field.referenceId) {
                            // TODO do user input check with field.referenceId + does type exist
                            await database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                            await database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                            update = true;
                        }

                        // Update type or required
                        if (oldField.type !== field.type || oldField.required !== field.required) {
                            await database.ITEM_TABLE_FIELD_EDIT.executeConnection(connection, field);
                            update = true;
                        }

                        // Delete/Create unique index
                        if (oldField.unique && !field.unique) {
                            await database.ITEM_TABLE_UI_DROP.executeConnection(connection, oldField);
                            update = true;
                        } else if (!oldField.unique && field.unique) {
                            await database.ITEM_TABLE_UI_CREATE.executeConnection(connection, oldField);
                            update = true;
                        }

                        // If anything changed update type field
                        if (update) {
                            await database.TYPE_FIELD_EDIT.executeConnection(connection, field);
                        }
                        continue oldLoop;
                    }
                }

                // oldField not found -> delete it
                if (oldField.type === TypeFieldType.reference) {
                    // If type is reference -> first delete foreign key
                    await database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                }
                // Delete type field and drop field from item table
                await database.TYPE_FIELD_DELETE.executeConnection(connection, oldField.id);
                await database.ITEM_TABLE_FIELD_DROP.executeConnection(connection, oldField);
            }

            for (const field of fields) {
                // Create type field for field id
                field.id = (await database.TYPE_FIELD_CREATE.executeConnection(connection, field)).insertId;
                // Create new column in item table + constraints
                await database.ITEM_TABLE_FIELD_CREATE.executeConnection(connection, field);
                if (field.unique) {
                    await database.ITEM_TABLE_UI_CREATE.executeConnection(connection, field);
                }
                if (field.type === TypeFieldType.reference) {
                    await database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                }
            }
        });
    }

    /**
     * Deletes a type and references depending on it
     * @param database current DatabaseContoller instance
     * @param id id of the type to delete
     * @returns Promise that finishes when successfully deleted
     */
    static async delete(database: DatabaseController, id: number): Promise<void> {
        // Check if the type event exists
        if (!TypeModel.exists(database, id)) {
            throw ApiError.NOT_FOUND(ErrorNumber.TYPE_NOT_FOUND);
        }

        // Get a list of all fields that reference this type
        const references: TypeField[] = await database.TYPE_FIELD_GET_REFERENCEID.execute(id);

        await database.beginTransaction(async function(connection) {
            // Delete all foreign-keys and fields that reference this table
            for (const reference of references) {
                await database.ITEM_TABLE_FK_DROP.executeConnection(connection, reference);
                await database.ITEM_TABLE_FIELD_DROP.executeConnection(connection, reference);
            }

            // Drop the table and delete the type
            await database.ITEM_TABLE_DROP.executeConnection(connection, id);
            await database.TYPE_DELTE.executeConnection(connection, id);
        });

        // Remove the type from the cache if it even is in there
        await TypeModel.cache.del(id.toString());
    }
}

