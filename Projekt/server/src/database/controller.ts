import { Pool } from '../../types/mariadb';
import { CREATE_TABLE_USER, USER_CREATE } from './querys';

export function initializeTables(pool: Pool) {
    CREATE_TABLE_USER(pool);

    // Add a mock user as long as there is no other way to add users ('username', 'password')
    USER_CREATE(pool, [ 'username', '$2b$10$sFut8f1wXaMisJ750uiGbOD8UefoIZLLad5a66M7f/YMV5okNUgEC' ]).catch(err => null);
}