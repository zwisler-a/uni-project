import { EventEmitter } from "events";

declare module 'mariadb';

declare namespace mariadb {

    export interface ConnectionOptions {
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

    export interface PoolOptions extends ConnectionOptions {
        acquireTimeout?: number;
        connectionLimit?: number;
        minDelayValidation?: number;
        noControlAfterUse?: number;
    }

    export interface PoolClusterOptions {
        canRetry?: boolean;
        removeNodeErrorCount?: number;
        restoreNodeTimeout?: number;
        defaultSelector?: string;
    }

    export interface UserOptions {
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
        index: number;
        name: string;
        encoding: string;
        maxlen: number;
    }

    export interface ColumnMetadata {
        collation: Collation;
        columnLength: number;
        type: number;
        columnType: string;
        scale: number;
        flags: number;
        db: () => string;
        table: () => string;
        orgTable: () => string;
        name: () => string;
        orgName: () => string;
        schema: () => string;
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

    export interface SQLError extends Error {
        fatal: boolean;
        errno: number;
        sqlState: string;
        code: string;
    }

    export interface Connection extends EventEmitter {
        changeUser(options: UserOptions): Promise<void>;
        beginTransaction(): Promise<void>;
        commit(): Promise<void>;
        rollback(): Promise<void>;
        query(sql: string | QueryOptions, values?: any[] | any): Promise<Resultsets>;
        batch(sql: string | QueryOptions, values: any[][] | any[]): Promise<Resultsets>;
        queryStream(sql: string | QueryOptions, values?: any[] | any): EventEmitter;
        ping(): Promise<void>;
        reset(): Promise<void>;
        isValid(): boolean;
        end(): Promise<void>;
        destroy(): void;
        pause(): void;
        resume(): void;
        serverVersion(): string;
    }

    export interface Pool {
        getConnection(): Promise<Connection>;
        query(sql: string | QueryOptions, values?: any[] | any): Promise<Resultsets>;
        batch(sql: string | QueryOptions, values: any[][] | any[]): Promise<Resultsets>;
        end(): Promise<void>;
        activeConnections(): number;
        totalConnections(): number;
        idleConnections(): number;
        taskQueueSize(): number;
    }

    export interface PoolCluster {
        add(id: string, options: PoolOptions): void;
        remove(pattern: string): void;
        end(): Promise<void>;
        getConnection(pattern: string, selector: string): Promise<Connection>;
        of(pattern: string, selector: string): FilteredPoolCluster;
    }

    export interface FilteredPoolCluster {
        getConnection(): Promise<Connection>;
        query(sql: string | QueryOptions, values?: any[] | any): Promise<Resultsets>;
        batch(sql: string | QueryOptions, values: any[][] | any[]): Promise<Resultsets>;
    }

    export function createConnection(options: ConnectionOptions): Promise<Connection>;
    export function createPool(options: PoolOptions): Pool;
    export function createPoolCluster(options: PoolClusterOptions): PoolCluster;
}

export = mariadb;