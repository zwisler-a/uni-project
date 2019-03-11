import { DatabaseController } from '../controller';
import { User } from '../../api/models/user';
import { Role } from '../../api/models/role';
import { ApiError, ErrorNumber } from '../../types';
import { RoleModel } from './role';

/**
 * Database model class for user objects
 * @author Maurice
 */
export class UserModel {
    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the user model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (UserModel.database) {
            throw new Error('Already initialized UserModel');
        }
        UserModel.database = database;
    }

    /**
     * Create an user object
     * @param user new user object to create
     * @returns created user object on success
     */
    static async create(user: User): Promise<User> {
        const params = [ user.companyId, user.name, user.password, 'email' in user ? user.email : null ];
        const id = (await UserModel.database.USER.CREATE.execute(params)).insertId;

        user.id = id;
        user.roles = await UserModel.updateRoles(id, user.roles as number[]);

        return user;
    }

    private static async getRoles(id: number): Promise<Role[]> {
        return Promise.all((await UserModel.database.USER_ROLE.GET_USER.execute([ id ]))
            .map(async function(entry) {
                return RoleModel.get(entry.roleId);
            }));
    }

    /**
     * Get an user object
     * @param id id/name of the user object to get
     * @returns retrived user object on success
     */
    static async get(id: number | string): Promise<User> {
        let users;
        if (typeof id === 'number') {
            users = await UserModel.database.USER.GET_ID.execute(id);
        } else if (typeof id === 'string') {
            users = await UserModel.database.USER.GET_NAME.execute(id);
        } else {
            throw new TypeError('Invalid argument, has to be either string(name) or number(id)');
        }

        if (users.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.USER_NOT_FOUND, id);
        }

        const user: User = users.pop();
        user.roles = await UserModel.getRoles(user.id);

        return user;
    }

    /**
     * Get an user object by email
     * @param email email address of the user object to get
     * @returns retrieved user object on success
     */
    static async getByEmail(email: string): Promise<User> {
        const users = await UserModel.database.USER.GET_EMAIL.execute(email);
        if (users.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.USER_NOT_FOUND, email);
        }
        return users.pop();
    }

    /**
     * Get an array of all Users
     * @param id id/name of the user object to get
     * @returns retrived user object on success
     */
    static async getAll(companyId: number): Promise<User[]> {
        const users: User[] = await UserModel.database.USER.GET_COMPANY.execute([ companyId ]);
        for (const user of users) {
            user.roles = await UserModel.getRoles(user.id);
        }
        return users;
    }

    /**
     * Update an user object
     * @param id id of the user object to update
     * @param user new user object to update to
     * @returns update user object on success
     */
    static async update(id: number, user: User, companyId: number): Promise<User> {
        const result: User = await UserModel.get(id);

        // Should only be able to edit user from own company
        if (result.companyId !== companyId) {
            throw ApiError.FORBIDDEN(ErrorNumber.AUTHENTICATION_INVALID_COMPANY);
        }

        if ('name' in user) {
            result.name = user.name;
        }
        if ('password' in user) {
            result.password = user.password;
        }
        if ('email' in user) {
            result.email = user.email;
        }
        if ('roles' in user) {
            result.roles = await UserModel.updateRoles(id, user.roles as number[]);
        }

        const params = [ result.name, result.password, result.email, id ];
        if ((await UserModel.database.USER.UPDATE.execute(params)).affectedRows === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.COMPANY_NOT_FOUND, id);
        }

        return result;
    }

    /** TODO(Maurice) Schau mal nochmal drüber und mach das wie du das willst. Das vorherige hat nicht funktioniert */
    private static async updateRoles(id: number, roles: number[]): Promise<Role[]> {
        const rolesCopy = roles.slice();
        const old = (await UserModel.database.USER_ROLE.GET_USER.execute([id])).map(role => role.roleId);

        await UserModel.database.beginTransaction(async function(connection) {
            // added
            await Promise.all(roles.map(async role => {
                if (!old.includes(role)) {
                    await UserModel.database.USER_ROLE.CREATE.executeConnection(connection, [id, role]);
                }
            }));
            // Removed
            await Promise.all(old.map(async oldRole => {
                if (!roles.includes(oldRole)) {
                    await UserModel.database.USER_ROLE.DELETE.executeConnection(connection, [id, oldRole]);
                }
            }));

           /* oldLoop:
            for (const oldRole of old) {
                for (let i = 0; i < rolesCopy.length; i++) {
                    if (oldRole.roleId === rolesCopy[i]) {
                        rolesCopy.splice(i--, 1);
                        continue oldLoop;
                    }
                }

                await UserModel.database.USER_ROLE.DELETE.executeConnection(connection, [ id, oldRole ]);
            }
            for (const role of rolesCopy) {
                await UserModel.database.USER_ROLE.CREATE.executeConnection(connection, [ id, role ]);
            }*/
        });

        return await Promise.all(roles.map(async function(roleId) {
            return RoleModel.get(roleId);
        }));
    }

    /**
     * Deletes an user object
     * @param id id of the user object to delete
     * @returns nothing on success
     */
    static async delete(id: number): Promise<void> {
        if ((await UserModel.database.USER.DELETE.execute(id)).affectedRows === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.USER_NOT_FOUND, id);
        }
    }
}
