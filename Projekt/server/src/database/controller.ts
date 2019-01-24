import { Pool, Connection } from '../../types/mariadb';
import { factory, Queries } from './queries';
import { UserModel } from './models/user';

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

export interface DatabaseController extends Queries, Pool {
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
        ...factory(pool, prefix),

        async beginTransaction(handler: TransactionHandler): Promise<void> {
            const connection: Connection = await this.getConnection();
            await connection.beginTransaction();
            try {
                await handler(connection);
                await connection.commit();
            } catch (error) {
                await connection.rollback();
                throw error;
            }
            await connection.end();
        }
    };

    // Initilize all tables
    await controller.CREATE_TABLE_COMPANY.execute();
    await controller.CREATE_TABLE_USER.execute();
    await controller.CREATE_TABLE_TYPE.execute();
    await controller.CREATE_TABLE_TYPE_FIELD.execute();

    // Initilize all models
    UserModel.initialize(controller);

    // TODO REMOVE Add a mock company as long as there is no other way to add companies ('company')
    let companyId;
    const company = (await controller.COMPANY_GET_ID.execute('company')).pop();
    if (!company) {
        companyId = (await controller.COMPANY_CREATE.execute([ 'company' ])).insertId;
    } else {
        companyId = company.id;
    }

    // TODO REMOVE Add a mock user as long as there is no other way to add users ('username', 'password')
    if (!(await controller.USER_GET_ID.execute('username')).pop()) {
        await controller.USER_CREATE.execute([ companyId, 'username', '$2b$10$sFut8f1wXaMisJ750uiGbOD8UefoIZLLad5a66M7f/YMV5okNUgEC' ]);
    }

    return controller;
}