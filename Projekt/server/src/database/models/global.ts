import { Cache } from '../../util/cache';
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
}