import { Pool } from '../../types/mariadb';
import { CREATE_TABLE_USER, USER_CREATE, USER_GET } from './querys';

export async function initializeTables(pool: Pool) {
    await CREATE_TABLE_USER(pool);

    // Add a mock user as long as there is no other way to add users ('username', 'password')
    if (!(await USER_GET(pool, 'username')).pop()) {
        await USER_CREATE(pool, [ 'username', '$2b$10$sFut8f1wXaMisJ750uiGbOD8UefoIZLLad5a66M7f/YMV5okNUgEC' ]);
    }
}