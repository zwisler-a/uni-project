import { DatabaseController } from '../controller';
import { User } from '../../api/models/user';
import { ApiError, ErrorNumber } from '../../types';

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
        // TODO check if company exists
        const params = [ user.companyId, user.name, user.password, 'email' in user ? user.email : null ];

        const id = (await UserModel.database.USER.CREATE.execute(params)).insertId;
        user.id = id;

        return user;
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

        return users.pop();
    }

    /**
     * Get an array of all Users
     * @param id id/name of the user object to get
     * @returns retrived user object on success
     */
    static async getAll(): Promise<User[]> {
        // TODO maybe only users of one company
        return await UserModel.database.USER.GET.execute();
    }

    /**
     * Update an user object
     * @param id id of the user object to update
     * @param user new user object to update to
     * @returns update user object on success
     */
    static async update(id: number, user: User): Promise<User> {
        const result: User = await UserModel.get(id);

        if ('name' in user) {
            result.name = user.name;
        }
        if ('password' in user) {
            result.password = user.password;
        }
        if ('email' in user) {
            result.email = user.email;
        }

        const params = [ result.name, result.password, result.email, id ];
        if ((await UserModel.database.USER.UPDATE.execute(params)).affectedRows === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.COMPANY_NOT_FOUND, id);
        }

        return result;
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