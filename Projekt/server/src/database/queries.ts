import { Pool, ObjectResultsets, ArrayResultsets } from '../../types/mariadb';
import { StaticQuery, DynamicQuery } from './query';

export interface Queries {
    CREATE_TABLE_COMPANY: StaticQuery<ObjectResultsets>;
    CREATE_TABLE_USER: StaticQuery<ObjectResultsets>;
    CREATE_TABLE_TYPE: StaticQuery<ObjectResultsets>;
    CREATE_TABLE_TYPE_FIELD: StaticQuery<ObjectResultsets>;

    CREATE_TYPE_TABLE: DynamicQuery<ObjectResultsets>;

    COMPANY_CREATE: StaticQuery<ObjectResultsets>;
    COMPANY_GET: StaticQuery<ArrayResultsets>;

    USER_CREATE: StaticQuery<ObjectResultsets>;
    USER_GET: StaticQuery<ArrayResultsets>;

    TYPE_CREATE: StaticQuery<ObjectResultsets>;
    TYPE_GET: StaticQuery<ArrayResultsets>;

    TYPE_FIELD_CREATE: StaticQuery<ObjectResultsets>;
    TYPE_FIELD_GET: StaticQuery<ArrayResultsets>;
}

export function factory(pool: Pool, prefix: string): Queries {

    function queryFactory(sql: string): StaticQuery<any> {
        sql = sql.split('%_').join(prefix);
        return new StaticQuery(pool, sql);
    }

    const types: any = {
        string: 'VARCHAR(128)',
        number: 'INT',
        boolean: 'BIT(1)',
        file: 'VARCHAR(256)',
        color: 'VARCHAR(32)',
        date: 'DATE',
        reference: 'INT UNSIGNED'
    };

    function generateTabel(structure: any) {
        let constraints = 'PRIMARY KEY (\`id\`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE';
        let sql = `CREATE TABLE \`%_item_${structure.id}\` (\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT, \`companyId\` SMALLINT UNSIGNED NOT NULL, `;
        structure.fields.forEach((field: any) => {
            if (!Object.keys(types).some((type: string) => type === field.type)) {
                throw new Error(`Invalid type '${field.type}'`);
            }

            const name = `\`field_${field.id}\``;
            sql += `${name} ${types[field.type]}`;
            if (field.required) {
                sql += ' NOT NULL';
            }
            sql += ', ';

            if (field.unique) {
                constraints += `, CONSTRAINT ${name} UNIQUE INDEX (${name})`;
            }
            if (field.type === 'reference') {
                if (typeof field.referenceTypeId !== 'number') {
                    throw new Error(`Invalid referenceTypeId '${field.referenceTypeId}' is not a number`);
                }
                constraints += `, CONSTRAINT ${name} FOREIGN KEY (${name}) REFERENCES \`%_item_${field.referenceTypeId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`;
            }
        });
        sql += constraints + ');';
        return sql.split('%_').join(prefix);
    }

    return {
        CREATE_TABLE_COMPANY: queryFactory('CREATE TABLE IF NOT EXISTS `%_company` (`id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_USER: queryFactory('CREATE TABLE IF NOT EXISTS `%_users` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `password` VARCHAR(60) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE: queryFactory('CREATE TABLE IF NOT EXISTS `%_types` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_TYPE_FIELD: queryFactory('CREATE TABLE IF NOT EXISTS `%_types_field` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `typeId` MEDIUMINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` VARCHAR(32) NOT NULL DEFAULT \'text\', `required` BIT NOT NULL DEFAULT 0, `unique` BIT NOT NULL DEFAULT 0, PRIMARY KEY (`id`), UNIQUE INDEX (`typeId`, `name`), FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),

        CREATE_TYPE_TABLE: new DynamicQuery(pool, generateTabel),

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


