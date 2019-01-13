import { Pool, Connection, Resultsets } from '../../types/mariadb';

export abstract class Query {
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;

        this.error = this.error.bind(this);
    }

    protected error(error: any): any {
        // Remove sensitive data (parameters)
        error.message = error.message.split('\n', 1).shift();

        // Set the query that caused the error
        error.query = this;

        // Pass error to next handler
        throw error;
    }
}

export class StaticQuery<T extends Resultsets> extends Query {
    sql: string;

    constructor(pool: Pool, sql: string) {
        super(pool);
        this.sql = sql;
    }

    async execute(values?: any[] | any): Promise<T> {
        return this.pool.query(this.sql, values).catch(this.error) as Promise<T>;
    }

    async executeConnection(connection: Connection, values?: any[] | any): Promise<T> {
        return connection.query(this.sql, values).catch(this.error) as Promise<T>;
    }
}

export interface DynamicQueryBuilder {
    (structure: any): string;
}

export class DynamicQuery<T extends Resultsets> extends Query {
    builder: DynamicQueryBuilder;

    constructor(pool: Pool, builder: DynamicQueryBuilder) {
        super(pool);
        this.builder = builder;
    }

    private errorDynamic(error: any, sql: string) {
        // Set generate sql
        error.sql = sql;

        this.error(error);
    }

    async execute(structure: any, values?: any[] | any): Promise<T> {
        const sql = this.builder(structure);
        return this.pool.query(sql, values).catch(error => this.errorDynamic(error, sql)) as Promise<T>;
    }

    async executeConnection(connection: Connection, structure: any, values?: any[] | any): Promise<T> {
        const sql = this.builder(structure);
        return connection.query(sql, values).catch(error => this.errorDynamic(error, sql)) as Promise<T>;
    }
}