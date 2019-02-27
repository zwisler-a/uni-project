import { DatabaseController } from '../controller';
import { Role } from '../../api/models/role';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Database model class for role objects
 * @author Maurice
 */
export class RoleModel {
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

    static async get(id: number): Promise<Role> {
        const roles = await RoleModel.database.ROLE.GET_ID.execute([ id ]);
        if (roles.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ROLE_NOT_FOUND, id);
        }

        const role: Role = roles.pop();
        role.permission = (role.permission as any).readUInt8();
        role.types = (await RoleModel.database.ROLE_PERMISSION.GET.execute([ role.id ]))
            .reduce((akku, value) => {
                akku[value.typeId] = value.permission.readUInt8();
            }, {});

        return role;
    }

    static async create(role: Role): Promise<Role> {
        await RoleModel.database.beginTransaction(async function(connection) {
            const id = (await RoleModel.database.ROLE.CREATE.executeConnection(connection,
                [ role.companyId, role.name, Buffer.of(role.permission) ])).insertId;
            role.id = id;

            await Promise.all(Object.keys(role.types).map(function(typeId: any) {
                return RoleModel.database.ROLE_PERMISSION.CREATE.executeConnection(connection,
                    [ id, typeId, Buffer.of(role.types[typeId]) ]);
            }));
        });

        return role;
    }

    static async update(id: number, role: Role) {

    }
}