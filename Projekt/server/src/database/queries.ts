import { Pool, ObjectResultsets, ArrayResultsets } from '../../types/mariadb';
import { StaticQuery, DynamicQuery } from './query';
import { Type, TypeField } from '../api/models/type';

export interface Queries {
    /** Creates the company table */
    CREATE_TABLE_COMPANY: StaticQuery<ObjectResultsets>;
    /** Creates the user table */
    CREATE_TABLE_USER: StaticQuery<ObjectResultsets>;
    /** Creates the type table */
    CREATE_TABLE_TYPE: StaticQuery<ObjectResultsets>;
    /** Creates the type field table */
    CREATE_TABLE_TYPE_FIELD: StaticQuery<ObjectResultsets>;
    /** Creates the role table */
    CREATE_TABLE_ROLE: StaticQuery<ObjectResultsets>;
    /** Creates the role permission table */
    CREATE_TABLE_ROLE_PERMISSION: StaticQuery<ObjectResultsets>;

    /** Creates a new company */
    COMPANY_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a list of all companies */
    COMPANY_GET: StaticQuery<ArrayResultsets>;
    /** Gets a company by id */
    COMPANY_GET_ID: StaticQuery<ArrayResultsets>;
    /** Updates a company by id */
    COMPANY_UPDATE: StaticQuery<ObjectResultsets>;
    /** Deletes a company by id */
    COMPANY_DELETE: StaticQuery<ObjectResultsets>;

    /** Create an new user */
    USER_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a list of all users */
    USER_GET: StaticQuery<ArrayResultsets>;
    /** Gets an user by id */
    USER_GET_ID: StaticQuery<ArrayResultsets>;
    /** Gets an user by name */
    USER_GET_NAME: StaticQuery<ArrayResultsets>;
    /** Updates an user by id */
    USER_UPDATE: StaticQuery<ObjectResultsets>;
    /** Deletes an user by id */
    USER_DELETE: StaticQuery<ObjectResultsets>;

    /** Creates a new type */
    TYPE_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets all types */
    TYPE_GET: StaticQuery<ArrayResultsets>;
    /** Gets a type by id */
    TYPE_GET_ID: StaticQuery<ArrayResultsets>;
    /** Gets a type by company's id */
    TYPE_GET_COMPANY: StaticQuery<ArrayResultsets>;
    /** Checks by id if a type exists */
    TYPE_EXISTS_ID: StaticQuery<ArrayResultsets>;
    /** Edit a type by id */
    TYPE_UPDATE: StaticQuery<ObjectResultsets>;
    /** Deletes a type by id */
    TYPE_DELETE: StaticQuery<ObjectResultsets>;

    /** Creates a new type field */
    TYPE_FIELD_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets a type field by id */
    TYPE_FIELD_GET_ID: StaticQuery<ArrayResultsets>;
    /** Gets a type field by typeId */
    TYPE_FIELD_GET_TYPEID: StaticQuery<ArrayResultsets>;
    /** Gets a type field by referenceId */
    TYPE_FIELD_GET_REFERENCEID: StaticQuery<ArrayResultsets>;
    /** Edit a type field by id */
    TYPE_FIELD_UPDATE: StaticQuery<ObjectResultsets>;
    /** Delete a type field by id */
    TYPE_FIELD_DELETE: StaticQuery<ObjectResultsets>;

    ROLE_CREATE: StaticQuery<ObjectResultsets>;
    ROLE_GET: StaticQuery<ArrayResultsets>;
    ROLE_GET_ID: StaticQuery<ArrayResultsets>;
    ROLE_UPDATE: StaticQuery<ObjectResultsets>;
    ROLE_DELETE: StaticQuery<ObjectResultsets>;

    ROLE_PERMISSION_CREATE: StaticQuery<ObjectResultsets>;
    ROLE_PERMISSION_GET_ID: StaticQuery<ArrayResultsets>;
    ROLE_PERMISSION_UPDATE: StaticQuery<ObjectResultsets>;
    ROLE_PERMISSION_DELETE: StaticQuery<ObjectResultsets>;

    /** Creates a new item table */
    ITEM_TABLE_CREATE: DynamicQuery<ObjectResultsets, Type>;
    /** Deletes an item table */
    ITEM_TABLE_DROP: DynamicQuery<ObjectResultsets, number>;
    /** Creates a new field in an item table */
    ITEM_TABLE_FIELD_CREATE: DynamicQuery<ObjectResultsets, TypeField>;
    /** Edites a specific field in an item table */
    ITEM_TABLE_FIELD_EDIT: DynamicQuery<ObjectResultsets, TypeField>;
    /** Deletes a specific field in an item table */
    ITEM_TABLE_FIELD_DROP: DynamicQuery<ObjectResultsets, TypeField>;
    /** Creates a new foreign key constraint in an item table */
    ITEM_TABLE_FK_CREATE: DynamicQuery<ObjectResultsets, TypeField>;
    /** Deltes a foreign key constraint in an item table */
    ITEM_TABLE_FK_DROP: DynamicQuery<ObjectResultsets, TypeField>;
    /** Creates a new unique index constraint in an item table */
    ITEM_TABLE_UI_CREATE: DynamicQuery<ObjectResultsets, TypeField>;
    /** Deltes a unique index constraint in an item table */
    ITEM_TABLE_UI_DROP: DynamicQuery<ObjectResultsets, TypeField>;

    /** Creates a new item of one type */
    ITEM_CREATE: DynamicQuery<ObjectResultsets, Type>;
    /** Gets all items of one type */
    ITEM_GET: DynamicQuery<ArrayResultsets, Sortable<number, TypeField>>;
    /** Gets all items of one type in range(offset, length) */
    ITEM_GET_RANGE: DynamicQuery<ArrayResultsets, Sortable<number, TypeField>>;
    /** Gets an item by id on one type */
    ITEM_GET_ID: DynamicQuery<ArrayResultsets, number>;
    /** Gets the number of items of one type */
    ITEM_GET_COUNT: DynamicQuery<ArrayResultsets, number>;
    /** Updates (overwrites) an item by id of one type */
    ITEM_UPDATE: DynamicQuery<ObjectResultsets, Type>;
    /** Deletes an item by id of one type */
    ITEM_DELETE: DynamicQuery<ObjectResultsets, number>;
}

export enum SortOrder {
    DESC = 'DESC',
    ASC = 'ASC'
}

export interface Sortable<U, V> {
    value: U;
    sorter?: V;
    order?: SortOrder;
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

    function generateTabel(structure: Type) {
        let constraints = 'PRIMARY KEY (\`id\`)';
        let sql = `CREATE TABLE \`%_item_${structure.id}\` (\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT, `;
        structure.fields.forEach(function(field: TypeField) {
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

    function dropTable(structure: number) {
        return `DROP TABLE \`%_item_${structure}\``.replace('%_', prefix);
    }

    function addTableField(structure: TypeField) {
        let sql = `ALTER TABLE \`%_item_${structure.typeId}\` ADD COLUMN \`field_${structure.id}\` ${types[structure.type]}`;
        if (structure.required) {
            sql += ' NOT NULL';
        }
        return sql.replace('%_', prefix);
    }

    function editTableField(structure: TypeField) {
        let sql = `ALTER TABLE \`%_item_${structure.typeId}\` MODIFY COLUMN \`field_${structure.id}\` ${types[structure.type]}`;
        if (structure.required) {
            sql += ' NOT NULL';
        }
        return sql.replace('%_', prefix);
    }

    function dropTableField(structure: TypeField) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP COLUMN \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateForeignKey(structure: TypeField) {
        const field = `\`field_${structure.id}\``;
        return `ALTER TABLE \`%_item_${structure.typeId}\` ADD CONSTRAINT ${field} FOREIGN KEY (${field}) REFERENCES \`%_item_${structure.referenceId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`.split('%_').join(prefix);
    }

    function dropForeignKey(structure: TypeField) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP FOREIGN KEY \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateUniqueIndex(structure: TypeField) {
        const field = `\`field_${structure.id}\``;
        return `ALTER TABLE \`%_item_${structure.typeId}\` ADD CONSTRAINT ${field} UNIQUE INDEX (${field})`.replace('%_', prefix);
    }

    function dropUniqueIndex(structure: TypeField) {
        return `ALTER TABLE \`%_item_${structure.typeId}\` DROP INDEX \`field_${structure.id}\``.replace('%_', prefix);
    }

    function generateItem(structure: Type) {
        let values = 'NULL';
        let sql = `INSERT INTO \`%_item_${structure.id}\` (\`id\``;
        structure.fields.forEach(function(field: TypeField) {
            sql += `, \`field_${field.id}\``;
            values += ', ?';
        });
        sql += ') VALUES (';
        sql += values + ');';
        return sql.split('%_').join(prefix);
    }

    function getItem(id: number) {
        return `SELECT * FROM \`%_item_${id}\` WHERE \`id\` = ?`.replace('%_', prefix);
    }

    function getItemList({ value, sorter, order }: Sortable<number, TypeField>) {
        let sql = `SELECT * FROM \`%_item_${value}\``;
        if (typeof sorter !== 'undefined') {
            sql += `ORDER BY \`field_${sorter.id}\` ${order}`;
        }
        return sql.replace('%_', prefix);
    }

    function getItemListRange({ value, sorter, order }: Sortable<number, TypeField>) {
        let sql = `SELECT * FROM \`%_item_${value}\``.replace('%_', prefix);
        if (typeof sorter !== 'undefined') {
            sql += ` ORDER BY \`field_${sorter.id}\` ${order}`;
        }
        sql += ' LIMIT ?, ?';
        return sql.replace('%_', prefix);
    }

    function getItemTotal(id: number) {
        return `SELECT COUNT(*) FROM \`%_item_${id}\``.replace('%_', prefix);
    }

    function updateItem(structure: Type) {
        let sql = `UPDATE \`%_item_${structure.id}\` SET`;
        structure.fields.forEach(function(field: TypeField, index: number) {
            if (index !== 0) {
                sql += ', ';
            }
            sql += `\`field_${field.id}\` = ?`;
        });
        sql += ' WHERE `id` = ?;';
        return sql.split('%_').join(prefix);
    }

    function deleteItem(id: number) {
        return `DELETE FROM \`%_item_${id}\` WHERE \`id\` = ?`.replace('%_', prefix);
    }

    return {
        CREATE_TABLE_COMPANY: queryFactory('CREATE TABLE IF NOT EXISTS `%_company` (`id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));'),
        CREATE_TABLE_USER: queryFactory('CREATE TABLE IF NOT EXISTS `%_users` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `password` VARCHAR(60) NOT NULL, `email` VARCHAR(128), PRIMARY KEY (`id`), UNIQUE INDEX (`name`), UNIQUE INDEX (`email`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE: queryFactory('CREATE TABLE IF NOT EXISTS `%_types` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE_FIELD: queryFactory('CREATE TABLE IF NOT EXISTS `%_types_field` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `typeId` MEDIUMINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` ENUM(\'string\', \'number\', \'boolean\', \'file\', \'color\', \'date\', \'reference\') NOT NULL, `required` BIT NOT NULL, `unique` BIT NOT NULL, `referenceId` MEDIUMINT UNSIGNED, PRIMARY KEY (`id`), UNIQUE INDEX (`typeId`, `name`), FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`referenceId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_ROLE: queryFactory('CREATE TABLE IF NOT EXISTS `%_roles` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `permissions` BIT(4) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_ROLE_PERMISSION: queryFactory('CREATE TABLE IF NOT EXISTS `%_roles_permissions` (`roleId` INT UNSIGNED NOT NULL, `typeId` MEDIUMINT UNSIGNED NOT NULL, `permissions` BIT(3) NOT NULL, PRIMARY KEY (`roleId`, `typeId`), FOREIGN KEY (`roleId`) REFERENCES `%_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),

        COMPANY_CREATE: queryFactory('INSERT INTO `%_company` (`id`, `name`) VALUES (NULL,?)'),
        COMPANY_GET: queryFactory('SELECT * FROM `%_company`'),
        COMPANY_GET_ID: queryFactory('SELECT * FROM `%_company` WHERE `id` = ?'),
        COMPANY_UPDATE: queryFactory('UPDATE `%_company` SET `name` = ? WHERE `id` = ?'),
        COMPANY_DELETE: queryFactory('DELETE FROM `%_company` WHERE `id` = ?'),

        USER_CREATE: queryFactory('INSERT INTO `%_users` (`id`, `companyId`, `name`, `password`, `email`) VALUES (NULL,?,?,?,?)'),
        USER_GET: queryFactory('SELECT * FROM `%_users`'),
        USER_GET_ID: queryFactory('SELECT * FROM `%_users` WHERE `id` = ?'),
        USER_GET_NAME: queryFactory('SELECT * FROM `%_users` WHERE `name` = ?'),
        USER_UPDATE: queryFactory('UPDATE `%_users` SET `name` = ?, `password` = ?, `email` = ? WHERE `id` = ?'),
        USER_DELETE: queryFactory('DELETE FROM `%_users` WHERE `id` = ?'),

        TYPE_CREATE: queryFactory('INSERT INTO `%_types` (`id`, `companyId`, `name`) VALUES (NULL,?,?)'),
        TYPE_GET: queryFactory('SELECT * FROM `%_types`'),
        TYPE_GET_ID: queryFactory('SELECT * FROM `%_types` WHERE `id` = ?'),
        TYPE_GET_COMPANY: queryFactory('SELECT * FROM `%_types` WHERE `companyId` = ?'),
        TYPE_EXISTS_ID: queryFactory('SELECT 1 FROM `%_types` WHERE `id` = ?'),
        TYPE_UPDATE: queryFactory('UPDATE `%_types` SET `companyId` = ?, `name` = ? WHERE `id` = ?'),
        TYPE_DELETE: queryFactory('DELETE FROM `%_types` WHERE `id` = ?'),

        TYPE_FIELD_CREATE: queryFactory('INSERT INTO `%_types_field` (`id`, `typeId`, `name`, `type`, `required`, `unique`, `referenceId`) VALUES (NULL,?,?,?,?,?,?);'),
        TYPE_FIELD_GET_ID: queryFactory('SELECT * FROM `%_types_field` WHERE `id` = ?'),
        TYPE_FIELD_GET_TYPEID: queryFactory('SELECT * FROM `%_types_field` WHERE `typeId` = ?'),
        TYPE_FIELD_GET_REFERENCEID: queryFactory('SELECT * FROM `%_types_field` WHERE `referenceId` = ?'),
        TYPE_FIELD_UPDATE: queryFactory('UPDATE `%_types_field` SET `name` = ?, `type` = ?, `required` = ?, `unique` = ?, `referenceId` = ? WHERE `id` = ?'),
        TYPE_FIELD_DELETE: queryFactory('DELETE FROM `%_types_field` WHERE `id` = ?'),

        ROLE_CREATE: queryFactory('INSERT INTO `%_roles` (`id`, `companyId`, `name`, `permissions`) VALUES (NULL,?,?,?)'),
        ROLE_GET: queryFactory('SELECT * FROM `%_roles`'),
        ROLE_GET_ID: queryFactory('SELECT * FROM `%_roles` WHERE `id` = ?'),
        ROLE_UPDATE: queryFactory('UPDATE `%_roles` SET `name` = ?, `permissions` = ? WHERE `id` = ?'),
        ROLE_DELETE: queryFactory('DELETE FROM `%_roles` WHERE `id` = ?'),

        ROLE_PERMISSION_CREATE: queryFactory('INSERT INTO `%_roles_permissions` (`roleId`, `typeId`, `permissions`) VALUES (?,?,?)'),
        ROLE_PERMISSION_GET_ID: queryFactory('SELECT * FROM `%_roles_permissions` WHERE `roleId` = ?, `typeId` = ?'),
        ROLE_PERMISSION_UPDATE: queryFactory('UPDATE `%_roles_permissions` SET `permissions` = ? WHERE `roleId` = ? AND `typeId` = ?'),
        ROLE_PERMISSION_DELETE: queryFactory('DELETE FROM `%_roles_permissions` WHERE `roleId` = ? AND `typeId` = ?'),

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
        ITEM_GET_RANGE: new DynamicQuery(pool, getItemListRange),
        ITEM_GET_ID: new DynamicQuery(pool, getItem),
        ITEM_GET_COUNT: new DynamicQuery(pool, getItemTotal),
        ITEM_UPDATE: new DynamicQuery(pool, updateItem),
        ITEM_DELETE: new DynamicQuery(pool, deleteItem),
    };
}


