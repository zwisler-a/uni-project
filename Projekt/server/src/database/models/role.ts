import { Cache } from '../../util/cache';
import { Role } from '../../api/models/role';
import { ApiError, ErrorNumber } from '../../types';
import { DatabaseController } from '../controller';

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

    private static async fetchTypes(id: number): Promise<{ [typeId: string]: number }> {
        return (await RoleModel.database.ROLE_PERMISSION.GET.execute([ id ]))
            .reduce((akku, value) => {
                akku[value.typeId] = value.permission.readUInt8();
            }, {});
    }

    private static async fetch(id: number): Promise<Role> {
        const roles = await RoleModel.database.ROLE.GET_ID.execute([ id ]);
        if (roles.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.ROLE_NOT_FOUND, id);
        }

        const role: Role = roles.pop();
        role.permission = (role.permission as any).readUInt8();
        role.types = await RoleModel.fetchTypes(id);

        return role;
    }

    static async get(id: number): Promise<Role> {
        const key = id.toString();

        // Check cache
        let role: Role = await RoleModel.cache.get(key);
        if (role === undefined) {
            // Fetch role
            role = await RoleModel.fetch(id);
            await RoleModel.cache.set(key, role);
        } else {
            // Reset ttl after get
            RoleModel.cache.ttl(key);
        }
        return role;
    }

    static async getAll(companyId: number): Promise<Role[]> {
        const roles: Role[] = await RoleModel.database.ROLE.GET_COMPANY.execute([ companyId ]);

        for (const role of roles) {
            const id = role.id.toString();
            const cached: Role = await RoleModel.cache.get(id);

            if (cached === undefined) {
                role.types = await RoleModel.fetchTypes(role.id);
                await RoleModel.cache.set(id, role);
            } else {
                role.types = cached.types;
                await RoleModel.cache.ttl(id);
            }
        }

        return roles;
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

        await RoleModel.cache.set(role.id.toString(), role);
        return role;
    }

    static async update(id: number, role: Role): Promise<Role> {
        const types = Object.keys(role.types);

        const old: Role = await RoleModel.get(id);
        role.id = id;
        role.companyId = old.companyId;

        await RoleModel.database.beginTransaction(async function(connection) {
            if (role.name !== old.name || role.permission !== old.permission) {
                await RoleModel.database.ROLE.UPDATE.executeConnection(connection, [role.name, role.permission, id]);
            }

            oldLoop:
            for (const oldType in old.types) {
                for (let i = 0; i < types.length; i++) {
                    const type = types[i];
                    if (oldType === type) {

                        // Remove type for faster loop
                        types.splice(i--, 1);

                        // If permission changed update
                        if (role.types[type] !== old.types[type]) {
                            await RoleModel.database.ROLE_PERMISSION.UPDATE.executeConnection(connection, [role.types[type], id, type]);
                        }
                        continue oldLoop;
                    }

                    // oldType not found -> delete
                    await RoleModel.database.ROLE_PERMISSION.DELETE.executeConnection(connection, [id, type]);
                }
            }

            // Create new type permissions
            for (const type of types) {
                await RoleModel.database.ROLE_PERMISSION.CREATE.executeConnection(connection, [id, type, role.types[type]]);
            }
        });

        await RoleModel.cache.set(id.toString(), role);
        return role;
    }

    static async delete(id: number) {
        await RoleModel.database.ROLE.DELETE.execute([ id ]);
        await RoleModel.cache.del(id.toString());
    }
}