import { Cache } from './cache';
import { DatabaseController } from '../controller';
import { Role, RoleTablePermission, RolePermission, PermissionType } from '../../api/models/roles';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Database model class for role objects
 * @author Maurice
 */
export class RoleModel {
    /** Role cache 1h */
    private static readonly cache = new Cache<Role>({
        stdTTL: 3600,
        checkperiod: 600
    });

    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the role model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (RoleModel.database) {
            throw new Error('Already initialized RoleModel');
        }
        RoleModel.database = database;
    }

    static async create(role: Role): Promise<Role> {
        let mask = 0;
        for (const permission of role.permission as RolePermission[]) {
            if (permission.allowed) {
                mask |= (1 << permission.type);
            }
        }

        RoleModel.database.beginTransaction(async function(connection) {
            const id = (await RoleModel.database.ROLE_CREATE.executeConnection(connection, [ 1, role.name, mask ])).insertId;
            role.id = id;

            for (const table of role.tablePermission) {
                let mask = 0;
                for (const permission of table.permission as RolePermission[]) {
                    if (permission.allowed) {
                        mask |= (1 << permission.type);
                    }
                }

                await RoleModel.database.ROLE_PERMISSION_CREATE.executeConnection(connection, [ id, table.typeId, mask ]);
            }
        });

        return role;
    }
}