declare module 'mariadb';

declare namespace mariadb {
    export function createPool(options: PoolOptions): Pool;

    export interface PoolOptions {
        user?: string;
        password?: string;
        host?: string;
        port?: number;
        database?: string;
        socketPath?: string;
        compress?: boolean;
        connectTimeout?: number;
        socketTimeout?: number;
        rowsAsArray?: boolean;
    }

    export interface Pool {
        getConnection(): Promise<Connection>;
        query(sql: string | any, values: any[] | any): Promise<any>;
        end(): Promise<void>;
    }

    export interface Connection {
        query(sql: string | any, values: any[] | any): Promise<any>;
        end(): Promise<void>;
    }
}

export = mariadb;