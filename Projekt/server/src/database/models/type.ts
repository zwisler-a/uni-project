import { Cache } from './cache';
import { DatabaseController } from '../controller';
import { Type, TypeField, TypeFieldType } from '../../api/models/type';
import { ApiError, ErrorNumber } from '../../types';

export class TypeModel {
    private static readonly cache = new Cache<Type>({
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

    /**
     * Creates a new type and an associated dynamic item table
     * @param database current DatabaseContoller instance
     * @param type Type to be created
     */
    static async create(database: DatabaseController, type: Type): Promise<void> {
        // Check if all referenced types exist
        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference && !TypeModel.exists(database, field.referenceId)) {
                throw ApiError.NOT_FOUND(ErrorNumber.TYPE_REFERENCE_NOT_FOUND, field);
            }
        }

        await database.beginTransaction(async function(connection) {
            const id = (await database.TYPE_CREATE.executeConnection(connection, [1, type.name])).insertId;

            // Insert all fields
            const fieldIds = await Promise.all(type.fields.map(function(field: TypeField) {
                const reference = field.type === TypeFieldType.reference ? field.referenceId : null;
                return database.TYPE_FIELD_CREATE.executeConnection(connection, [ id, field.name, field.type, field.required, field.unique, reference ]);
            }));

            // Set representative with newly generated fields
            await database.TYPE_REPRESENTATIVE.executeConnection(connection, fieldIds[type.representative].insertId);

            // Create new dynamic item table
            await database.ITEM_TABLE_CREATE.execute({
                id,
                fields: type.fields.map((field, index) => {
                    field.id = fieldIds[index].insertId;
                })
            });
        });
    }

    static async update(database: DatabaseController, id: number, type: Type): Promise<void> {
        const old = TypeModel.get(database, id);


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

