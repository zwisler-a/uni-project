import { Pool, Connection, Resultsets, ObjectResultsets, ArrayResultsets } from '../../types/mariadb';

export class Query<T extends Resultsets> {
    pool: Pool;
    sql: string;

    constructor(pool: Pool, sql: string) {
        this.pool = pool;
        this.sql = sql;

        this.error = this.error.bind(this);
    }

    private error(error: any): any {
        // Remove sensitive data (parameters)
        error.message = error.message.split('\n', 1).shift();

        // Set the query that caused the error
        error.query = this;

        // Pass error to next handler
        throw error;
    }

    async execute(values?: any[] | any): Promise<T> {
        return this.pool.query(this.sql, values).catch(this.error) as Promise<T>;
    }

    async executeConnection(connection: Connection, values?: any[] | any): Promise<T> {
        return connection.query(this.sql, values).catch(this.error) as Promise<T>;
    }
}

export interface Queries {
    CREATE_TABLE_COMPANY: Query<ObjectResultsets>;
    CREATE_TABLE_USER: Query<ObjectResultsets>;
    CREATE_TABLE_TYPE: Query<ObjectResultsets>;
    CREATE_TABLE_TYPE_FIELD: Query<ObjectResultsets>;

    COMPANY_CREATE: Query<ObjectResultsets>;
    COMPANY_GET: Query<ArrayResultsets>;

    USER_CREATE: Query<ObjectResultsets>;
    USER_GET: Query<ArrayResultsets>;

    TYPE_CREATE: Query<ObjectResultsets>;
    TYPE_GET: Query<ArrayResultsets>;

    TYPE_FIELD_CREATE: Query<ObjectResultsets>;
    TYPE_FIELD_GET: Query<ArrayResultsets>;
}

export function factory(pool: Pool, prefix: string): Queries {

    function queryFactory(sql: string): Query<any> {
        sql = sql.split('%_').join(prefix);
        return new Query(pool, sql);
    }

    return {
        CREATE_TABLE_COMPANY: queryFactory('CREATE TABLE IF NOT EXISTS `%_company` (`id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_USER: queryFactory('CREATE TABLE IF NOT EXISTS `%_users` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `password` VARCHAR(60) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE: queryFactory('CREATE TABLE IF NOT EXISTS `%_types` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_TYPE_FIELD: queryFactory('CREATE TABLE IF NOT EXISTS `%_types_field` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `typeId` MEDIUMINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` VARCHAR(32) NOT NULL DEFAULT \'text\', `required` BIT NOT NULL DEFAULT 0, `unique` BIT NOT NULL DEFAULT 0, PRIMARY KEY (`id`), UNIQUE INDEX (`typeId`, `name`), FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),

        COMPANY_CREATE: queryFactory('INSERT INTO `%_company` (`id`, `name`) VALUES (NULL,?)'),
        COMPANY_GET: queryFactory('SELECT * FROM `%_company` WHERE `name` = ?'),

        USER_CREATE: queryFactory('INSERT INTO `%_users` (`id`, `companyId`, `name`, `password`) VALUES (NULL,?,?,?)'),
        USER_GET: queryFactory('SELECT * FROM `%_users` WHERE `name` = ?'),

        TYPE_CREATE: queryFactory('INSERT INTO `%_types` (`id`, `name`) VALUES (NULL,?)'),
        TYPE_GET: queryFactory('SELECT * FROM `%_types` WHERE `id` = ?'),

        TYPE_FIELD_CREATE: queryFactory('INSERT INTO `%_types_field`(`id`, `typeId`, `name`, `type`, `required`, `unique`) VALUES (NULL, ?,?,?,?,?);'),
        TYPE_FIELD_GET: queryFactory('SELECT * FROM `%_types` WHERE `id` = ?'),
    };
}


