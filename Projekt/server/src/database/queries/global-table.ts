import { ObjectResultsets } from 'mariadb';
import { DynamicQuery, Queries } from '../query';
import { GlobalField } from '../../api/models/global';
import { ItemTableQueries } from './item-table';

export class GlobalTableQueries extends Queries {

    readonly CREATE: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `CREATE TABLE ${this.prefix}global_${id} (
            typeId INT UNSIGNED NOT NULL,
            id INT UNSIGNED NOT NULL,
            PRIMARY KEY (typeId, id),
            FOREIGN KEY (typeId)
              REFERENCES ${this.prefix}types(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`;
    });

    readonly DROP: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `DROP TABLE ${this.prefix}global_${id}`;
    });

    readonly ADD_COLUMN: DynamicQuery<ObjectResultsets, GlobalField> = this.dynamic((field: GlobalField) => {
        const name = `global_${field.id}`;
        let sql = `ALTER TABLE ${this.prefix}global_${field.companyId} ADD COLUMN ${name} ${ItemTableQueries.types[field.type]}`;

        if (field.required) {
            sql += ' NOT NULL';
        }

        if (field.unique) {
            sql += `, ADD CONSTRAINT ${name} UNIQUE INDEX (${name})`;
        }

        return sql;
    });

    readonly MODIFY_COLUMN: DynamicQuery<ObjectResultsets, GlobalField> = this.dynamic((field: GlobalField) => {
        let sql = `ALTER TABLE ${this.prefix}global_${field.companyId} MODIFY COLUMN global_${field.id} ${ItemTableQueries.types[field.type]}`;
        if (field.required) {
            sql += ' NOT NULL';
        }
        return sql;
    });

    readonly DROP_COLUMN: DynamicQuery<ObjectResultsets, GlobalField> = this.dynamic((field: GlobalField) => {
        return `ALTER TABLE ${this.prefix}global_${field.companyId} DROP COLUMN global_${field.id}`;
    });

    readonly ADD_UNIQUE_INDEX: DynamicQuery<ObjectResultsets, GlobalField> = this.dynamic((field: GlobalField) => {
        const name = `global_${field.id}`;
        return `ALTER TABLE ${this.prefix}global_${field.companyId} ADD CONSTRAINT ${name} UNIQUE INDEX (${name})`;
    });

    readonly DROP_UNIQUE_INDEX: DynamicQuery<ObjectResultsets, GlobalField> = this.dynamic((field: GlobalField) => {
        return `ALTER TABLE ${this.prefix}global_${field.companyId} DROP INDEX global_${field.id}`;
    });
}