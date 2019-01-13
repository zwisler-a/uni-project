import { Pool, Connection } from '../../types/mariadb';
import { factory, Queries } from './queries';

export interface TransactionHandler {
    (connection: Connection): void;
}

export interface DatabaseController extends Queries, Pool {
    beginTransaction(handler: TransactionHandler): Promise<void>;
}

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