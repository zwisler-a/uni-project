import { Pool, Connection, Resultsets } from 'mariadb';

/**
 * Very simple abstraction for queries
 * @author Maurice
 */
export abstract class Query {

    /** Current datbase pool instance */
    pool: Pool;

    /**
     * Creates a new query
     * @param pool current database pool instance
     */
    constructor(pool: Pool) {
        this.pool = pool;

        // Bind function so we have the query's instance in `this`
        this.error = this.error.bind(this);
    }

    /**
     * Helper method for Promise.catch()
     * @param error the reason Promise.catch got called
     * @throws the given error to the next handler
     */
    protected error(error: any): any {
        // Remove sensitive data (parameters)
        error.message = error.message.split('\n', 1).shift();

        // Set the query that caused the error
        error.query = this;

        // Pass error to next handler
        throw error;
    }
}

/**
 * A helper class for static (don't change at runtime) sql queries
 * @author Maurice
 */
export class StaticQuery<T extends Resultsets> extends Query {

    /** The static sql query */
    sql: string;

    /**
     * Creates a new static query
     * @param pool current database pool instance
     * @param sql static sql query
     */
    constructor(pool: Pool, sql: string) {
        super(pool);
        this.sql = sql;
    }

    /**
     * Executes the query on the pool
     * @param values values to be used for the query (prepared statement)
     * @returns the query's resultset
     */
    async execute(values?: any[] | any): Promise<T> {
        return this.pool.query(this.sql, values).catch(this.error) as Promise<T>;
    }

    /**
     * Executes the query on a specify connection
     * @param connection connection to execute on
     * @param values values to be used for the query (prepared statement)
     * @returns the query's resultset
     */
    async executeConnection(connection: Connection, values?: any[] | any): Promise<T> {
        return connection.query(this.sql, values).catch(this.error) as Promise<T>;
    }
}

/**
 * Function that generates a valid sql query at runtime
 * @author Maurice
 */
export interface DynamicQueryBuilder<T> {
    /**
     * Generates a sql query string at runtime
     * @param structure parameters to be used to generate the query
     * @returns a valid sql query
     */
    (structure: T): string;
}

/**
 * A helper class for dynamic (at runtime generated) sql queries
 * @author Maurice
 */
export class DynamicQuery<T extends Resultsets, U> extends Query {

    /** Sql query build */
    builder: DynamicQueryBuilder<U>;

    /**
     * Creates a new dynamic query
     * @param pool current database pool instance
     * @param sql this query's sql builder
     */
    constructor(pool: Pool, builder: DynamicQueryBuilder<U>) {
        super(pool);
        this.builder = builder;
    }

    /**
     * Helper method for Promise.catch() which does the same thing as {@link Query.error} and also attaches the generated sql
     * @param error the reason Promise.catch got called
     * @param sql the generated sql
     * @throws the given error to the next handler
     */
    private errorDynamic(error: any, sql: string) {
        // Set generate sql
        error.sql = sql;

        // Call Query.error for further error improvements
        this.error(error);
    }

    /**
     * Executes the query on the pool
     * @param structure parameters used to generate the query
     * @param values values to be used for the query (prepared statement)
     * @returns the query's resultset
     */
    async execute(structure: U, values?: any[] | any): Promise<T> {
        const sql = this.builder(structure);
        return this.pool.query(sql, values).catch(error => this.errorDynamic(error, sql)) as Promise<T>;
    }

    /**
     * Executes the query on a specify connection
     * @param connection connection to execute on
     * @param structure parameters used to generate the query
     * @param values values to be used for the query (prepared statement)
     * @returns the query's resultset
     */
    async executeConnection(connection: Connection, structure: U, values?: any[] | any): Promise<T> {
        const sql = this.builder(structure);
        return connection.query(sql, values).catch(error => this.errorDynamic(error, sql)) as Promise<T>;
    }
}

export class Queries {

    pool: Pool;
    prefix: string;

    constructor(pool: Pool, prefix: string) {
        this.pool = pool;
        this.prefix = prefix;
    }

    private strip(value: string): string {
        return value.split(/\s{2,}/).join(' ');
    }

    protected sql<T>(query: string): StaticQuery<T> {
        return new StaticQuery<T>(this.pool, this.strip(query));
    }

    protected dynamic<T, U>(builder: DynamicQueryBuilder<U>): DynamicQuery<T, U> {
        return new DynamicQuery<T, U>(this.pool, builder);
    }
}