import { EventEmitter } from "events";

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

    export interface ConnectionOptions {
        database?: string;
        charset?: string;
        password?: string;
        user?: string;
    }

    export interface QueryOptions {
        sql: string;
        namedPlaceholders?: boolean;
        rowsAsArray?: boolean;
        nestTables?: string | boolean;
        dateStrings?: boolean;
        supportBigNumbers?: boolean;
        bigNumberStrings?: boolean;
        typeCast?: (column: any, next: () => any) => any;
    }

    export interface Collation {
        encoding: string;
        index: number;
        maxlen: number;
        name: string;
    }

    export interface ColumnMetadata {
        collation: Collation;
        columnLength: number;
        columnType: number;
        flags: number;
        scale: number;
        type: string;
        db: () => string;
        name: () => string;
        orgName: () => string;
        orgTable: () => string;
        schema: () => string;
        table: () => string;
    }

    export interface Resultsets {
    }

    export interface ObjectResultsets extends Resultsets {
        affectedRows: number;
        insertId: number;
        warningStatus: number;
    }

    export interface ArrayResultsets extends Resultsets, Array<any> {
        meta: Array<ColumnMetadata>;
    }

    export interface Pool {
        getConnection(): Promise<Connection>;
        query(sql: string | QueryOptions, values?: any[] | any): Promise<Resultsets>;
        //batch(sql: string | QueryOptions, values: any[] | any): Promise<Resultsets>;
        end(): Promise<void>;
        activeConnections(): number;
        totalConnections(): number;
        idleConnections(): number;
        taskQueueSize(): number;
    }

    export interface Connection {
        //connect(): Promise<any>;
        changeUser(options: ConnectionOptions): Promise<void>;
        beginTransaction(): Promise<void>;
        commit(): Promise<void>;
        rollback(): Promise<void>;
        query(sql: string | QueryOptions, values?: any[] | any): Promise<Resultsets>;
        //batch(sql: string | QueryOptions, values: any[] | any): Promise<Resultsets>;
        queryStream(sql: string | QueryOptions, values?: any[] | any): EventEmitter;
        ping(): Promise<void>;
        //reset(): Promise<void>;
        isValid(): boolean;
        end(): Promise<void>;
        destroy(): void;
        pause(): void;
        resume(): void;
        serverVersion(): string;
    }

    export interface SQLError extends Error {
        fatal: boolean;
        errno: number;
        sqlState: string;
        code: string;
    }
}

export = mariadb;