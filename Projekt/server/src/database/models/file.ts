import { Cache } from '../../util/cache';
import { DatabaseController } from '../controller';
import { File } from '../../api/models/file';
import { TypeField, TypeFieldType } from '../../api/models/type';
import { ApiError, ErrorNumber } from '../../types';
import { ItemModel } from './item';

/**
 * Database model class for file objects
 * @author Maurice
 */
export class FileModel {
    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the file model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (FileModel.database) {
            throw new Error('Already initialized FileModel');
        }
        FileModel.database = database;
    }

    static async create(file: File): Promise<void> {
        const fields: TypeField[] = await FileModel.database.TYPE_FIELD.GET_ID.execute([ file.fieldId ]);
        if (fields.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.FILE_NOT_FOUND, file.fieldId);
        }

        const field: TypeField = fields.pop();
        if (field.type !== TypeFieldType.file) {
            throw ApiError.BAD_REQUEST(ErrorNumber.FILE_FIELD_WRONG_TYPE, field.id);
        }

        const items: any[] = await FileModel.database.ITEM.EXISTS.execute(field.typeId, [ file.itemId ]);
        if (items.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ITEM_NOT_FOUND, file.itemId);
        }

        await FileModel.database.ITEM_FILE.CREATE.execute([ file.fieldId, file.itemId, file.timestamp, file.name, file.mime ]);
    }

    static async get(fieldId: number, itemId: number, timestamp: Date): Promise<File> {
        const files: File[] = await FileModel.database.ITEM_FILE.GET_TIMESTAMP.execute([ fieldId, itemId, timestamp ]);
        if (files.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.FILE_NOT_FOUND);
        }
        return files.pop();
    }

    // TODO maybe fetch only itemId
    static async getAllItem(fieldId: number, itemId: number): Promise<File[]> {
        return await FileModel.database.ITEM_FILE.GET_ITEM.execute([ fieldId, itemId ]);
    }

    static async getAll(fieldId: number): Promise<File[]> {
        return await FileModel.database.ITEM_FILE.GET.execute([ fieldId ]);
    }

    static async delete(fieldId: number, itemId: number): Promise<void> {
        await FileModel.database.ITEM_FILE.DELETE.execute([ fieldId, itemId ]);
    }
}