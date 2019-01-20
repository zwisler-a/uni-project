import { Pool, ObjectResultsets, ArrayResultsets } from '../../types/mariadb';
import { StaticQuery, DynamicQuery } from './query';
import { createDeflate } from 'zlib';

export interface Queries {
    /** Creates the company table */
    CREATE_TABLE_COMPANY: StaticQuery<ObjectResultsets>;
    /** Creates the user table */
    CREATE_TABLE_USER: StaticQuery<ObjectResultsets>;
    /** Creates the type table */
    CREATE_TABLE_TYPE: StaticQuery<ObjectResultsets>;
    /** Creates the type field table */
    CREATE_TABLE_TYPE_FIELD: StaticQuery<ObjectResultsets>;

    /** Creates a new company */
    COMPANY_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a company by id */
    COMPANY_GET_ID: StaticQuery<ArrayResultsets>;

    /** Create a new user */
    USER_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a user by id */
    USER_GET_ID: StaticQuery<ArrayResultsets>;

    /** Creates a new type */
    TYPE_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets all types */
    TYPE_GET: StaticQuery<ArrayResultsets>;
    /** Gets a type by id */
    TYPE_GET_ID: StaticQuery<ArrayResultsets>;
    /** Checks by id if a type exists */
    TYPE_EXISTS_ID: StaticQuery<ArrayResultsets>;
    /** Deletes a type by id */
    TYPE_DELTE: StaticQuery<ObjectResultsets>;

    /** Creates a new type field */
    TYPE_FIELD_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a type field by id */
    TYPE_FIELD_GET_ID: StaticQuery<ArrayResultsets>;
    /** Gets a type field by typeId */
    TYPE_FIELD_GET_TYPEID: StaticQuery<ArrayResultsets>;
    /** Gets a type field by referenceId */
    TYPE_FIELD_GET_REFERENCEID: StaticQuery<ArrayResultsets>;
    /** Edit a type field by id */
    TYPE_FIELD_EDIT: StaticQuery<ObjectResultsets>;
    /** Delete a type field by id */
    TYPE_FIELD_DELETE: StaticQuery<ObjectResultsets>;

    /** Creates a new item table */
    ITEM_TABLE_CREATE: DynamicQuery<ObjectResultsets>;
    /** Deletes an item table */
    ITEM_TABLE_DROP: DynamicQuery<ObjectResultsets>;
    /** Creates a new field in an item table */
    ITEM_TABLE_FIELD_CREATE: DynamicQuery<ObjectResultsets>;
    /** Edites a specific field in an item table */
    ITEM_TABLE_FIELD_EDIT: DynamicQuery<ObjectResultsets>;
    /** Deletes a specific field in an item table */
    ITEM_TABLE_FIELD_DROP: DynamicQuery<ObjectResultsets>;
    /** Creates a new foreign key constraint in an item table */
    ITEM_TABLE_FK_CREATE: DynamicQuery<ObjectResultsets>;
    /** Deltes a foreign key constraint in an item table */
    ITEM_TABLE_FK_DROP: DynamicQuery<ObjectResultsets>;
    /** Creates a new unique index constraint in an item table */
    ITEM_TABLE_UI_CREATE: DynamicQuery<ObjectResultsets>;
    /** Deltes a unique index constraint in an item table */
    ITEM_TABLE_UI_DROP: DynamicQuery<ObjectResultsets>;

    /** Creates a new item of one type */
    ITEM_CREATE: DynamicQuery<ObjectResultsets>;
    /** Gets all items of one type in range(offset, length) */
    ITEM_GET: DynamicQuery<ArrayResultsets>;
    /** Gets an item by id on one type */
    ITEM_GET_ID: DynamicQuery<ArrayResultsets>;
    /** Gets the number of items of one type */
    ITEM_GET_COUNT: DynamicQuery<ArrayResultsets>;
    /** Updates (overwrites) an item by id of one type */
    ITEM_UPDATE: DynamicQuery<ObjectResultsets>;
    /** Deletes an item by id of one type */
    ITEM_DELETE: DynamicQuery<ObjectResultsets>;
}

/**
 * Generates a new instance of Queries
 * @param pool current database pool instance
 * @param prefix database config's table prefix
 * @returns new {@link Queries} instance
 */
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
        structure.fields.forEach(function(field: any) {
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
                if (typeof field.referenceId !== 'number') {
                    throw new Error(`Invalid referenceTypeId '${field.referenceId}' is not a number`);
                }
                constraints += `, CONSTRAINT ${name} FOREIGN KEY (${name}) REFERENCES \`%_item_${field.referenceId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`;
            }
        });
        sql += constraints + ');';
        return sql.split('%_').join(prefix);
    }

    function dropTable(structure: any) {
        return `DROP TABLE \`%_item_${structure}\``.replace('%_', prefix);
    }

    function addTableField(structure: any) {
        let sql = `ALTER TABLE \`%_item_${structure.typeId}\` ADD COLUMN \`field_${structure.id}\` ${types[structure.type]}`;
        if (structure.required) {
            sql += ' NOT NULL';
        }
        return sql.replace('%_', prefix);
    }

    function editTableField(structure: any) {
        let sql = `ALTER TABLE \`%_item_${structure.typeId}\` MODIFY COLUMN \`field_${structure.id}\` ${types[structure.type]}`;
        if (structure.required) {
            sql += ' NOT NULL';
        }
        return sql.replace('%_', prefix);
    }

    function dropTableField(structure: any) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP COLUMN \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateForeignKey(structure: any) {
        const field = `\`field_${structure.id}\``;
        return `ALTER TABLE \`%_item_${structure.typeId}\` ADD CONSTRAINT ${field} FOREIGN KEY (${field}) REFERENCES \`%_item_${structure.referenceId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`.replace('%_', prefix);
    }

    function dropForeignKey(structure: any) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP FOREIGN KEY \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateUniqueIndex(structure: any) {
        const field = `\`field_${structure.id}\``;
        return `ALTER TABLE \`%_item_${structure.typeId}\` ADD CONSTRAINT ${field} UNIQUE INDEX (${field})`.replace('%_', prefix);
    }

    function dropUniqueIndex(structure: any) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP INDEX \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateItem(structure: any) {
        let values = 'NULL, ?';
        let sql = `INSERT INTO \`%_item_${structure.id}\` (\`id\`, \`companyId\``;
        structure.fields.forEach(function(field: any) {
            sql += `, \`field_${field.id}\``;
            values += ', ?';
        });
        sql += ') VALUES (';
        sql += values + ');';
        return sql.split('%_').join(prefix);
    }

    function getItem(structure: any) {
        return `SELECT * FROM \`%_item_${structure.id}\` WHERE \`id\` = ?`.replace('%_', prefix);
    }

    function getItemList(structure: any) {
        return `SELECT * FROM \`%_item_${structure.id}\` LIMIT ?, ?`.replace('%_', prefix);
    }

    function getItemTotal(structure: any) {
        return `SELECT COUNT(*) FROM \`%_item_${structure.id}\``.replace('%_', prefix);
    }

    function updateItem(structure: any) {
        let sql = `UPDATE \`%_item_${structure.id}\` SET \`companyId\` = ?`;
        structure.fields.forEach(function(field: any) {
            sql += `, \`field_${field.id}\` = ?`;
        });
        sql += ' WHERE `id` = ?;';
        return sql.split('%_').join(prefix);
    }

    function deleteItem(structure: any) {
        return `DELETE FROM \`%_item_${structure.id}\` WHERE \`id\` = ?`.replace('%_', prefix);
    }

    return {
        CREATE_TABLE_COMPANY: queryFactory('CREATE TABLE IF NOT EXISTS `%_company` (`id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_USER: queryFactory('CREATE TABLE IF NOT EXISTS `%_users` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `password` VARCHAR(60) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE: queryFactory('CREATE TABLE IF NOT EXISTS `%_types` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_TYPE_FIELD: queryFactory('CREATE TABLE IF NOT EXISTS `%_types_field` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `typeId` MEDIUMINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` ENUM(\'string\', \'number\', \'boolean\', \'file\', \'color\', \'date\', \'reference\') NOT NULL, `required` BIT NOT NULL, `unique` BIT NOT NULL, `referenceId` MEDIUMINT UNSIGNED, PRIMARY KEY (`id`), UNIQUE INDEX (`typeId`, `name`), FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`referenceId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),

        COMPANY_CREATE: queryFactory('INSERT INTO `%_company` (`id`, `name`) VALUES (NULL,?)'),
        COMPANY_GET_ID: queryFactory('SELECT * FROM `%_company` WHERE `name` = ?'),

        USER_CREATE: queryFactory('INSERT INTO `%_users` (`id`, `companyId`, `name`, `password`) VALUES (NULL,?,?,?)'),
        USER_GET_ID: queryFactory('SELECT * FROM `%_users` WHERE `name` = ?'),

        TYPE_CREATE: queryFactory('INSERT INTO `%_types` (`id`, `name`) VALUES (NULL,?)'),
        TYPE_GET: queryFactory('SELECT * FROM `%_types`'),
        TYPE_GET_ID: queryFactory('SELECT * FROM `%_types` WHERE `id` = ?'),
        TYPE_EXISTS_ID: queryFactory('SELECT 1 FROM `%_types` WHERE `id` = ?'),
        TYPE_DELTE: queryFactory('DELETE FROM `%_types` WHERE `id` = ?'),

        TYPE_FIELD_CREATE: queryFactory('INSERT INTO `%_types_field`(`id`, `typeId`, `name`, `type`, `required`, `unique`, `referenceId`) VALUES (NULL,?,?,?,?,?,?);'),
        TYPE_FIELD_GET_ID: queryFactory('SELECT * FROM `%_types_field` WHERE `id` = ?'),
        TYPE_FIELD_GET_TYPEID: queryFactory('SELECT * FROM `%_types_field` WHERE `typeId` = ?'),
        TYPE_FIELD_GET_REFERENCEID: queryFactory('SELECT * FROM `%_types_field` WHERE `referenceId` = ?'),
        TYPE_FIELD_EDIT: queryFactory('UPDATE `%_types_field` SET `name` = ?, `type` = ?, `required` = ?, `unique` = ?, `referenceId` = ? WHERE `id` = ?'),
        TYPE_FIELD_DELETE: queryFactory('DELETE FROM `%_types` WHERE `id` = ?'),

        ITEM_TABLE_CREATE: new DynamicQuery(pool, generateTabel),
        ITEM_TABLE_DROP: new DynamicQuery(pool, dropTable),
        ITEM_TABLE_FIELD_CREATE: new DynamicQuery(pool, addTableField),
        ITEM_TABLE_FIELD_EDIT: new DynamicQuery(pool, editTableField),
        ITEM_TABLE_FIELD_DROP: new DynamicQuery(pool, dropTableField),
        ITEM_TABLE_FK_CREATE: new DynamicQuery(pool, generateForeignKey),
        ITEM_TABLE_FK_DROP: new DynamicQuery(pool, dropForeignKey),
        ITEM_TABLE_UI_CREATE: new DynamicQuery(pool, generateUniqueIndex),
        ITEM_TABLE_UI_DROP: new DynamicQuery(pool, dropUniqueIndex),

        ITEM_CREATE: new DynamicQuery(pool, generateItem),
        ITEM_GET: new DynamicQuery(pool, getItemList),
        ITEM_GET_ID: new DynamicQuery(pool, getItem),
        ITEM_GET_COUNT: new DynamicQuery(pool, getItemTotal),
        ITEM_UPDATE: new DynamicQuery(pool, updateItem),
        ITEM_DELETE: new DynamicQuery(pool, deleteItem),
    };
}


