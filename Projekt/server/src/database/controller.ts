import { Pool, Connection } from 'mariadb';

import { CompanyModel } from './models/company';
import { UserModel } from './models/user';
import { TypeModel } from './models/type';
import { GlobalFieldModel } from './models/global';
import { ItemModel } from './models/item';
import { RoleModel } from './models/role';

import { CompanyQueries } from './queries/company';
import { GlobalTableQueries } from './queries/global-table';
import { GlobalQueries } from './queries/global';
import { ItemFileQueries } from './queries/item-file';
import { ItemTableQueries } from './queries/item-table';
import { ItemQueries } from './queries/item';
import { TypeFieldQueries } from './queries/type-field';
import { TypeQueries } from './queries/type';
import { RolePermissionQueries } from './queries/role-permission';
import { RoleQueries } from './queries/role';
import { UserQueries } from './queries/user';
import { UserRoleQueries } from './queries/user-role';
import { FileModel } from './models/file';

/**
 * Function that gets invoked inside a transaction
 * @author Maurice
 */
export interface TransactionHandler {
    /**
     * This function gets called inside a transaction
     * @param connection Connection of the current transaction (all query calls should use this connection instance)
     * @returns Promise which finishes once the TransactionHandler is finished
     */
    (connection: Connection): Promise<void>;
}

export interface DatabaseController extends Pool {
    COMPANY: CompanyQueries;
    GLOBAL_TABLE: GlobalTableQueries;
    GLOBAL: GlobalQueries;
    ITEM_FILE: ItemFileQueries;
    ITEM_TABLE: ItemTableQueries;
    ITEM: ItemQueries;
    TYPE_FIELD: TypeFieldQueries;
    TYPE: TypeQueries;
    ROLE_PERMISSION: RolePermissionQueries;
    ROLE: RoleQueries;
    USER: UserQueries;
    USER_ROLE: UserRoleQueries;

    /**
     * Helper function for database transactions that automatically begins, commits and rollbacks
     * @param handler handler which contains code which want's to be executed inside a transaction
     * @returns Promise which finishes when the transaction is finished
     */
    beginTransaction(handler: TransactionHandler): Promise<void>;
}

/**
 * Initializes the datbase and {@link DatabaseController}
 * @param pool current database pool instance
 * @param prefix database config's table prefix
 * @returns A Promise<DatabaseController> which is finished as soon as the database is ready to use
 */
export async function initializeDatabaseController(pool: Pool, prefix: string): Promise<DatabaseController> {
    const controller: DatabaseController = {
        ...pool,

        COMPANY: new CompanyQueries(pool, prefix),
        GLOBAL_TABLE: new GlobalTableQueries(pool, prefix),
        GLOBAL: new GlobalQueries(pool, prefix),
        ITEM_FILE: new ItemFileQueries(pool, prefix),
        ITEM_TABLE: new ItemTableQueries(pool, prefix),
        ITEM: new ItemQueries(pool, prefix),
        TYPE_FIELD: new TypeFieldQueries(pool, prefix),
        TYPE: new TypeQueries(pool, prefix),
        ROLE_PERMISSION: new RolePermissionQueries(pool, prefix),
        ROLE: new RoleQueries(pool, prefix),
        USER: new UserQueries(pool, prefix),
        USER_ROLE: new UserRoleQueries(pool, prefix),

        async beginTransaction(handler: TransactionHandler): Promise<void> {
            const connection: Connection = await this.getConnection();
            await connection.beginTransaction();
            try {
                await handler(connection);
                await connection.commit();
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                await connection.end();
            }
        }
    };

    // Initilize all tables
    await controller.COMPANY.CREATE_TABLE.execute();
    await controller.USER.CREATE_TABLE.execute();
    await controller.TYPE.CREATE_TABLE.execute();
    await controller.TYPE_FIELD.CREATE_TABLE.execute();
    await controller.TYPE_FIELD.CREATE_TABLE_FOREIGN_KEY.execute();
    await controller.ITEM_FILE.CREATE_TABLE.execute();
    await controller.GLOBAL.CREATE_TABLE.execute();
    await controller.ROLE.CREATE_TABLE.execute();
    await controller.ROLE_PERMISSION.CREATE_TABLE.execute();
    await controller.USER_ROLE.CREATE_TABLE.execute();

    // Initilize all models
    CompanyModel.initialize(controller);
    UserModel.initialize(controller);
    TypeModel.initialize(controller);
    GlobalFieldModel.initialize(controller);
    ItemModel.initialize(controller);
    FileModel.initialize(controller);
    RoleModel.initialize(controller);

    return controller;
}