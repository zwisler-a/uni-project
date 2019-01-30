import { Cache } from '../../util/cache';
import { Company } from '../../api/models/company';
import { GlobalField } from '../../api/models/global';
import { TypeFieldType } from '../../api/models/type';
import { DatabaseController } from '../controller';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Database model class for global field objects
 * @author Maurice
 */
export class GlobalFieldModel {
    /** global field cache 1h */
    private static readonly cache = new Cache<any>({
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
        if (GlobalFieldModel.database) {
            throw new Error('Already initialized TypeModel');
        }
        GlobalFieldModel.database = database;
    }

    static async create(company: Company, field: GlobalField) {
        await GlobalFieldModel.database.beginTransaction(async function(connection) {
            const params = [ company.id, field.name, field.type, field.required, field.unique ];
            const id = (await GlobalFieldModel.database.GLOBAL_CREATE.executeConnection(connection, params)).insertId;
        });
    }
}