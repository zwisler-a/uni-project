import { Cache } from './cache';
import { DatabaseController } from '../controller';
import { Type, TypeField, TypeFieldType } from '../../api/models/type';
import { ApiError, ErrorNumber } from '../../types';
import { type } from 'os';

export class TypeModel {
    /** Type cache 1h */
    private static readonly cache = new Cache<Type>({
        stdTTL: 3600,
        checkperiod: 600
    });

    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the user model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (TypeModel.database) {
            throw new Error('Already initialized TypeModel');
        }
        TypeModel.database = database;
    }

    private static mapField(field: any): TypeField {
        field.required = field.required.readUInt8() === 1;
        field.unique = field.unique.readUInt8() === 1;
        return field as TypeField;
    }

    private static async fetchFields(id: number): Promise<TypeField[]> {
        const fields = (await TypeModel.database.TYPE_FIELD_GET_TYPEID.execute(id)).map(TypeModel.mapField);

        for (const field of fields) {
            if (field.type === TypeFieldType.reference) {
                const references = await TypeModel.database.TYPE_FIELD_GET_ID.execute([ field.referenceId ]);
                if (references.length === 0) {
                    throw ApiError.NOT_FOUND(ErrorNumber.TYPE_FIELD_NOT_FOUND, field.referenceId);
                }

                field.reference = TypeModel.mapField(references.pop());
            }
        }

        return fields;
    }

    private static async fetchType(id: number): Promise<Type> {
        const types = await TypeModel.database.TYPE_GET_ID.execute(id);
        if (types.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.TYPE_NOT_FOUND, id);
        }

        const type: Type = types.pop();
        type.fields = await TypeModel.fetchFields(type.id);

        return type;
    }

    /**
     * Check if a type exists
     * @param id id of the type
     * @returns Promise that resolves whether the type exists
     */
    static async exists(id: number): Promise<boolean> {
        // Use a faster query (smaller answer) for exists since we don't care about data
        return (await TypeModel.database.TYPE_EXISTS_ID.execute(id)).length > 0;
    }

    /**
     * Gets a type from cache or the network
     * @param id id of the type
     * @returns Promise that resolves requested type
     */
    static async get(id: number): Promise<Type> {
        const key = id.toString();

        // Check cache
        let type: Type = await TypeModel.cache.get(key);
        if (type === undefined) {
            // Fetch type
            type = await TypeModel.fetchType(id);
            await TypeModel.cache.set(key, type);
        } else {
            // Reset ttl after get
            TypeModel.cache.ttl(key);
        }
        return type;
    }

    static async getAll(): Promise<Type[]> {
        // TODO use select * for type fields
        const types: Type[] = await TypeModel.database.TYPE_GET.execute();

        for (const type of types) {
            const id = type.id.toString();
            const cached: Type = await TypeModel.cache.get(id);

            if (cached === undefined) {
                type.fields = await TypeModel.fetchFields(type.id);
                await TypeModel.cache.set(id, type);
            } else {
                type.fields = cached.fields;
                await TypeModel.cache.ttl(id);
            }
        }

        return types;
    }

    private static async fetchReferences(type: Type) {
        const referencedTypes: number[] = [];
        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference) {
                // Check if the reference is nullable
                if (field.required) {
                    throw ApiError.BAD_REQUEST(ErrorNumber.TYPE_REFERENCE_NOT_NULL, field);
                }

                // Check if referenceId exists
                const references = await TypeModel.database.TYPE_FIELD_GET_ID.execute([ field.referenceId ]);
                if (references.length === 0) {
                    throw ApiError.NOT_FOUND(ErrorNumber.TYPE_REFERENCE_NOT_FOUND, field);
                }

                field.reference = TypeModel.mapField(references.pop());
                const typeId = field.reference.typeId;

                if (typeId === type.id) {
                    throw ApiError.BAD_REQUEST(ErrorNumber.TYPE_REFERENCE_SELF, typeId);
                }

                // A type can't reference a type multiple times
                if (referencedTypes.indexOf(typeId) !== -1) {
                    throw ApiError.BAD_REQUEST(ErrorNumber.TYPE_REFERENCE_MULTIPLE, typeId);
                }

                referencedTypes.push(typeId);
            }
        }
    }

    /**
     * Creates a new type and an associated dynamic item table
     * @param type Type to be created
     */
    static async create(type: Type): Promise<Type> {
        await TypeModel.fetchReferences(type);

        let result: Type;
        await TypeModel.database.beginTransaction(async function(connection) {
            const id = (await TypeModel.database.TYPE_CREATE.executeConnection(connection, [1, type.name])).insertId;

            // TODO Maybe use batch instead of query
            // Insert all fields
            const fieldIds = await Promise.all(type.fields.map(function(field: TypeField) {
                const reference = field.type === TypeFieldType.reference ? field.referenceId : null;
                return TypeModel.database.TYPE_FIELD_CREATE.executeConnection(connection, [ id, field.name, field.type, field.required, field.unique, reference ]);
            }));

            result = {
                id,
                companyId: 1,
                name: type.name,
                fields: type.fields.map((field, index) => {
                    field.id = fieldIds[index].insertId;
                    return field;
                })
            };

            // Create new dynamic item table
            await TypeModel.database.ITEM_TABLE_CREATE.execute(result);
        });

        return result;
    }

    static async update(id: number, type: Type): Promise<Type> {
        await TypeModel.fetchReferences(type);

        const fields = type.fields.slice();
        const old: Type = await TypeModel.get(id);

        await TypeModel.database.beginTransaction(async function(connection) {
            // Update type table
            await TypeModel.database.TYPE_UPDATE.executeConnection(connection, [1, type.name, id]);

            let update = false;
            oldLoop:
            for (const oldField of old.fields) {
                for (let i = 0; i < fields.length; i++) {
                    const field = fields[i];
                    if (oldField.id === field.id) {
                        // TODO rethink queries so the fields don't need the typeId
                        field.typeId = id;

                        // Remove field for faster loop
                        fields.splice(i, 1);

                        // Reset update flag
                        // Update if the name has changed
                        update = oldField.name !== field.name;

                        // If type changed from reference to another -> delete the foreign key to change the type
                        if (oldField.type === TypeFieldType.reference && field.type !== TypeFieldType.reference) {
                            await TypeModel.database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                            update = true;
                        }
                        // If type is still reference but the referenced type changed -> update (delete, create) foreign key
                        else if (oldField.type === TypeFieldType.reference && field.type === TypeFieldType.reference
                            && oldField.referenceId !== field.referenceId) {
                            await TypeModel.database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                            await TypeModel.database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                            update = true;
                        }

                        // Update type or required
                        if (oldField.type !== field.type || oldField.required !== field.required) {
                            await TypeModel.database.ITEM_TABLE_FIELD_EDIT.executeConnection(connection, field);
                            update = true;
                        }

                        // If type changed to reference create new foreign key
                        if (oldField.type !== TypeFieldType.reference && field.type === TypeFieldType.reference) {
                            await TypeModel.database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                            update = true;
                        }

                        // Delete/Create unique index
                        // TODO fix (also happens when creating new column): everything could have the same value
                        // when the type changed but unique enfources unique values TypeModel is a problem think about solutions
                        if (oldField.unique && !field.unique) {
                            await TypeModel.database.ITEM_TABLE_UI_DROP.executeConnection(connection, oldField);
                            update = true;
                        } else if (!oldField.unique && field.unique) {
                            await TypeModel.database.ITEM_TABLE_UI_CREATE.executeConnection(connection, oldField);
                            update = true;
                        }

                        // If anything changed update type field
                        if (update) {
                            const reference = field.type === TypeFieldType.reference ? field.referenceId : null;
                            await TypeModel.database.TYPE_FIELD_UPDATE.executeConnection(connection,
                                [ field.name, field.type, field.required, field.unique, reference, field.id ]);
                        }
                        continue oldLoop;
                    }
                }

                // oldField not found -> delete it
                if (oldField.type === TypeFieldType.reference) {
                    // If type is reference -> first delete foreign key
                    await TypeModel.database.ITEM_TABLE_FK_DROP.executeConnection(connection, oldField);
                }
                // Delete type field and drop field from item table
                await TypeModel.database.TYPE_FIELD_DELETE.executeConnection(connection, oldField.id);
                await TypeModel.database.ITEM_TABLE_FIELD_DROP.executeConnection(connection, oldField);
            }

            for (const field of fields) {
                // Create type field for field id
                const reference = field.type === TypeFieldType.reference ? field.referenceId : null;
                field.id = (await TypeModel.database.TYPE_FIELD_CREATE.executeConnection(connection,
                    [ id, field.name, field.type, field.required, field.unique, reference ])).insertId;
                field.typeId = id;
                // Create new column in item table + constraints
                await TypeModel.database.ITEM_TABLE_FIELD_CREATE.executeConnection(connection, field);
                if (field.unique) {
                    await TypeModel.database.ITEM_TABLE_UI_CREATE.executeConnection(connection, field);
                }
                if (field.type === TypeFieldType.reference) {
                    await TypeModel.database.ITEM_TABLE_FK_CREATE.executeConnection(connection, field);
                }
            }
        });

        // TODO later generate a valid Type object instead of fetching
        type = await TypeModel.fetchType(id);
        await TypeModel.cache.set(id.toString(), type);
        return type;
    }

    /**
     * Deletes a type and references depending on it
     * @param id id of the type to delete
     * @returns Promise that finishes when successfully deleted
     */
    static async delete(id: number): Promise<void> {
        // Check if the type event exists
        if (!TypeModel.exists(id)) {
            throw ApiError.NOT_FOUND(ErrorNumber.TYPE_NOT_FOUND);
        }

        // Get a list of all fields that reference TypeModel type
        const references: TypeField[] = await TypeModel.database.TYPE_FIELD_GET_REFERENCEID.execute(id);

        await TypeModel.database.beginTransaction(async function(connection) {
            // Delete all foreign-keys and fields that reference TypeModel table
            for (const reference of references) {
                await TypeModel.database.ITEM_TABLE_FK_DROP.executeConnection(connection, reference);
                await TypeModel.database.ITEM_TABLE_FIELD_DROP.executeConnection(connection, reference);
            }

            // Drop the table and delete the type
            await TypeModel.database.ITEM_TABLE_DROP.executeConnection(connection, id);
            await TypeModel.database.TYPE_DELETE.executeConnection(connection, id);
        });

        // Remove the type from the cache if it even is in there
        await TypeModel.cache.del(id.toString());
    }
}

