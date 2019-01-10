import { Pool } from '../../types/mariadb';
import { factory, Queries } from './querys';

function extend<T, U>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (const id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (const id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        } else {
            console.warn('Duplicate key: ', id);
        }
    }
    return result;
}

export interface DatabaseController extends Queries, Pool {
}

export async function initializeDatabaseController(pool: Pool, prefix: string): Promise<DatabaseController> {
    const controller: DatabaseController = extend(pool, factory(pool, prefix));

    // Initilize all tables
    await Promise.all([
        controller.CREATE_TABLE_COMPANY.execute(),
        controller.CREATE_TABLE_USER.execute(),
        controller.CREATE_TABLE_TYPE.execute(),
        controller.CREATE_TABLE_TYPE_FIELD.execute()
    ]);

    // TODO REMOVE Add a mock company as long as there is no other way to add companies ('company')
    let companyId;
    const company = (await controller.COMPANY_GET.execute('company')).pop();
    if (!company) {
        companyId = (await controller.COMPANY_CREATE.execute([ 'company' ])).insertId;
    } else {
        companyId = company.id;
    }

    // TODO REMOVE Add a mock user as long as there is no other way to add users ('username', 'password')
    if (!(await controller.USER_GET.execute('username')).pop()) {
        await controller.USER_CREATE.execute([ companyId, 'username', '$2b$10$sFut8f1wXaMisJ750uiGbOD8UefoIZLLad5a66M7f/YMV5okNUgEC' ]);
    }

    return controller;
}