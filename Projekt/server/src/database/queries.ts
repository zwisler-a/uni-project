import { Pool, ObjectResultsets, ArrayResultsets } from '../../types/mariadb';
import { StaticQuery, DynamicQuery } from './query';
import { Type, TypeField, TypeFieldType, FullType } from '../api/models/type';
import { GlobalField } from '../api/models/global';

export interface Queries {
    /** Creates the company table */
    CREATE_TABLE_COMPANY: StaticQuery<ObjectResultsets>;
    /** Creates the user table */
    CREATE_TABLE_USER: StaticQuery<ObjectResultsets>;
    /** Creates the type table */
    CREATE_TABLE_TYPE: StaticQuery<ObjectResultsets>;
    /** Creates the type field table */
    CREATE_TABLE_TYPE_FIELD: StaticQuery<ObjectResultsets>;
    /** Creates the type field table self reference */
    CREATE_TABLE_TYPE_FIELD_FOREIGN_KEY: StaticQuery<ObjectResultsets>;
    /** Creates the global table */
    CREATE_TABLE_GLOBAL: StaticQuery<ObjectResultsets>;
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
    /** Gets all type fields by typeId */
    TYPE_FIELD_GET_TYPEID: StaticQuery<ArrayResultsets>;
    /** Gets all type fields by referenceId */
    TYPE_FIELD_GET_REFERENCEID: StaticQuery<ArrayResultsets>;
    /** Edit a type field by id */
    TYPE_FIELD_UPDATE: StaticQuery<ObjectResultsets>;
    /** Delete a type field by id */
    TYPE_FIELD_DELETE: StaticQuery<ObjectResultsets>;

    /** Creates a new global field */
    GLOBAL_CREATE: StaticQuery<ObjectResultsets>;
    /** Gets all global fields */
    GLOBAL_GET: StaticQuery<ArrayResultsets>;
    /** Gets a global fields by id */
    GLOBAL_GET_ID: StaticQuery<ArrayResultsets>;
    /** Update a global field by id */
    GLOBAL_UPDATE: StaticQuery<ObjectResultsets>;
    /** Delete a global field by id */
    GLOBAL_DELETE: StaticQuery<ObjectResultsets>;

    GLOBAL_TABLE_CREATE: DynamicQuery<ObjectResultsets, number>;
    GLOBAL_TABLE_DROP: DynamicQuery<ObjectResultsets, number>;
    GLOBAL_TABLE_FIELD_ADD: DynamicQuery<ObjectResultsets, GlobalField>;
    GLOBAL_TABLE_FIELD_EDIT: DynamicQuery<ObjectResultsets, GlobalField>;
    GLOBAL_TABLE_FIELD_DROP: DynamicQuery<ObjectResultsets, { companyId: number, id: number }>;
    GLOBAL_TABLE_UI_ADD: DynamicQuery<ObjectResultsets, GlobalField>;
    GLOBAL_TABLE_UI_DROP: DynamicQuery<ObjectResultsets, GlobalField>;

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

/*    ITEM_VIEW_EDIT_ADD: DynamicQuery<ObjectResultsets, FullType>;
    ITEM_VIEW_EDIT_MODIFY: DynamicQuery<ObjectResultsets, FullType>;
    ITEM_VIEW_EDIT_DROP: DynamicQuery<ObjectResultsets, FullType>;

    ITEM_VIEW_GET_ADD: DynamicQuery<ObjectResultsets, FullType>;
    ITEM_VIEW_GET_MODIFY: DynamicQuery<ObjectResultsets, FullType>;
    ITEM_VIEW_GET_DROP: DynamicQuery<ObjectResultsets, FullType>;*/

    /** Creates a new item of one type */
    ITEM_CREATE: DynamicQuery<ObjectResultsets, Type>;
    /** Gets all items of one type */
    ITEM_GET: DynamicQuery<ArrayResultsets, Sortable<Type, TypeField>>;
    /** Gets all items of one type in range(offset, length) */
    ITEM_GET_RANGE: DynamicQuery<ArrayResultsets, Sortable<Type, TypeField>>;
    /** Gets an item by id on one type */
    ITEM_GET_ID: DynamicQuery<ArrayResultsets, Type>;
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

    /* TYPE */
    function generateTabel(structure: Type) {
        let constraints = 'PRIMARY KEY (\`id\`)';
        let sql = `CREATE TABLE \`%_item_${structure.id}\` (\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT, `;
        structure.fields.forEach((field: TypeField) => {
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
                constraints += `, CONSTRAINT ${name} FOREIGN KEY (${name}) REFERENCES \`%_item_${field.reference.typeId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`;
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
        return `ALTER TABLE \`%_item_${structure.typeId}\` ADD CONSTRAINT ${field} FOREIGN KEY (${field}) REFERENCES \`%_item_${structure.reference.typeId}\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`.split('%_').join(prefix);
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

    /* GLOBAL FIELDS */
    function generateGlobalTable(id: number) {
        return `CREATE TABLE \`%_global_${id}\` (\`typeId\` MEDIUMINT UNSIGNED NOT NULL, \`id\` INT UNSIGNED NOT NULL, PRIMARY KEY (\`typeId\`, \`id\`), FOREIGN KEY (\`typeId\`) REFERENCES \`%_types\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE);`.split('%_').join(prefix);
    }

    function dropGlobalTable(id: number) {
        return `DROP TABLE \`%_global_${id}\``.replace('%_', prefix);
    }

    function addTableGlobalField(structure: GlobalField) {
        const field = `\`global_${structure.id}\``;
        let sql = `ALTER TABLE \`%_global_${structure.companyId}\` ADD COLUMN ${field} ${types[structure.type]}`;

        if (structure.required) {
            sql += ' NOT NULL';
        }

        if (structure.unique) {
            sql += `, ADD CONSTRAINT ${field} UNIQUE INDEX (${field})`;
        }

        return sql.replace('%_', prefix);
    }

    function editTableGlobalField(structure: GlobalField) {
        let sql = `ALTER TABLE \`%_global_${structure.companyId}\` MODIFY COLUMN \`global_${structure.id}\` ${types[structure.type]}`;
        if (structure.required) {
            sql += ' NOT NULL';
        }
        return sql.replace('%_', prefix);
    }

    function dropTableGlobalField({ companyId, id }: { companyId: number, id: number }) {
        return `ALTER TABLE \`%_global_${companyId}\` DROP COLUMN \`global_${id}\``.replace('%_', prefix);
    }

    function generateGlobalUniqueIndex(structure: GlobalField) {
        const field = `\`global_${structure.id}\``;
        return `ALTER TABLE \`%_global_${structure.companyId}\` ADD CONSTRAINT ${field} UNIQUE INDEX (${field})`.replace('%_', prefix);
    }

    function dropGlobalUniqueIndex(structure: GlobalField) {
        return `ALTER TABLE \`%_global_${structure.companyId}\` DROP INDEX \`global_${structure.id}\``.replace('%_', prefix);
    }

    /* ITEM */
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

    function itemSelectQuery(type: Type, globals: GlobalField[]) {
        const table = `\`%_item_${type.id}\``;
        let select = `SELECT ${table}.*`;
        let from = `FROM ${table}`;

        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference) {
                const referenceTable = `\`%_item_${field.reference.typeId}\``;
                select += `, ${referenceTable}.\`field_${field.reference.id}\``;
                from += ` LEFT JOIN ${referenceTable} ON ${table}.\`field_${field.id}\` = ${referenceTable}.\`id\``;
            }
        }

        if (globals.length !== 0) {
            const globalTable = `\`%_global_${type.companyId}\``;
            for (const global of globals) {
                select += `, ${globalTable}.\`global_${global.id}\``;
            }
            from += ` LEFT JOIN ${globalTable} ON ${table}.\`id\` = ${globalTable}.\`id\` AND ${globalTable}.\`typeId\` = ${type.id}`;
        }

        return `${select} ${from}`.split('%_').join(prefix);
    }

    function getItem(type: Type) {
        return `${itemSelectQuery(type, [])} WHERE \`%_item_${type.id}\`.\`id\` = ?`.replace('%_', prefix);
    }

    function getItemList({ value: type, sorter, order }: Sortable<Type, TypeField>) {
        let sql = itemSelectQuery(type, []);

        if (typeof sorter !== 'undefined') {
            // TODO `table`.`field` + `table`.`global`
            sql += ` ORDER BY \`field_${sorter.id}\` ${order}`;
        }

        return sql;
    }

    function getItemListRange(sortable: Sortable<Type, TypeField>) {
        return `${getItemList(sortable)} LIMIT ?, ?`;
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
        CREATE_TABLE_TYPE_FIELD: queryFactory('CREATE TABLE IF NOT EXISTS `%_types_field` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `typeId` MEDIUMINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` ENUM(\'string\', \'number\', \'boolean\', \'file\', \'color\', \'date\', \'reference\') NOT NULL, `required` BIT NOT NULL, `unique` BIT NOT NULL, `referenceId` INT UNSIGNED, PRIMARY KEY (`id`), UNIQUE INDEX (`typeId`, `name`), FOREIGN KEY (`typeId`) REFERENCES `%_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
        CREATE_TABLE_TYPE_FIELD_FOREIGN_KEY: queryFactory('ALTER TABLE `%_types_field` ADD FOREIGN KEY (`referenceId`) REFERENCES `%_types_field` (`id`) ON DELETE CASCADE ON UPDATE CASCADE'),
        CREATE_TABLE_GLOBAL: queryFactory('CREATE TABLE IF NOT EXISTS `%_global` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `companyId` SMALLINT UNSIGNED NOT NULL, `name` VARCHAR(64) NOT NULL, `type` ENUM(\'string\', \'number\', \'boolean\', \'file\', \'color\', \'date\') NOT NULL, `required` BIT NOT NULL, `unique` BIT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`companyId`, `name`), FOREIGN KEY (`companyId`) REFERENCES `%_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);'),
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

        GLOBAL_CREATE: queryFactory('INSERT INTO `%_global` (`id`, `companyId`, `name`, `type`, `required`, `unique`) VALUES (NULL,?,?,?,?,?)'),
        GLOBAL_GET: queryFactory('SELECT * FROM `%_global` WHERE `companyId` = ?'),
        GLOBAL_GET_ID: queryFactory('SELECT * FROM `%_global` WHERE `id` = ?'),
        GLOBAL_UPDATE: queryFactory('UPDATE `%_global` SET `name` = ?, `type` = ?, `required` = ?, `unique` = ? WHERE `id` = ?'),
        GLOBAL_DELETE: queryFactory('DELETE FROM `%_global` WHERE `id` = ?'),

        GLOBAL_TABLE_CREATE: new DynamicQuery(pool, generateGlobalTable),
        GLOBAL_TABLE_DROP: new DynamicQuery(pool, dropGlobalTable),
        GLOBAL_TABLE_FIELD_ADD: new DynamicQuery(pool, addTableGlobalField),
        GLOBAL_TABLE_FIELD_EDIT: new DynamicQuery(pool, editTableGlobalField),
        GLOBAL_TABLE_FIELD_DROP: new DynamicQuery(pool, dropTableGlobalField),
        GLOBAL_TABLE_UI_ADD: new DynamicQuery(pool, generateGlobalUniqueIndex),
        GLOBAL_TABLE_UI_DROP: new DynamicQuery(pool, dropGlobalUniqueIndex),

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


