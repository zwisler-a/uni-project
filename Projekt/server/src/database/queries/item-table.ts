import { ObjectResultsets } from 'mariadb';
import { DynamicQuery, Queries } from '../query';
import { Type, TypeField } from '../../api/models/type';

export class ItemTableQueries extends Queries {

    static readonly types: { [key: string]: string } = {
        string: 'VARCHAR(128)',
        number: 'INT',
        boolean: 'BIT(1)',
        file: 'VARCHAR(256)',
        color: 'VARCHAR(32)',
        date: 'DATE',
        reference: 'INT UNSIGNED'
    };

    readonly CREATE: DynamicQuery<ObjectResultsets, Type> = this.dynamic((type: Type) => {
        let constraints = 'PRIMARY KEY (id)';
        let sql = `CREATE TABLE ${this.prefix}item_${type.id} (id INT UNSIGNED NOT NULL AUTO_INCREMENT, `;
        type.fields.forEach((field: TypeField) => {
            const name = `field_${field.id}`;
            sql += `${name} ${ItemTableQueries.types[field.type]}`;
            if (field.required) {
                sql += ' NOT NULL';
            }
            sql += ', ';

            if (field.unique) {
                constraints += `, CONSTRAINT ${name} UNIQUE INDEX (${name})`;
            }
            if (field.type === 'reference') {
                constraints += `,
                CONSTRAINT ${name} FOREIGN KEY (${name})
                  REFERENCES ${this.prefix}item_${field.reference.typeId}(id)
                  ON DELETE SET NULL
                  ON UPDATE CASCADE`;
            }
        });
        return `${sql}${constraints})`;
    });

    readonly DROP: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `DROP TABLE ${this.prefix}item_${id}`;
    });

    readonly ADD_COLUMN: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        let sql = `ALTER TABLE ${this.prefix}item_${field.typeId} ADD COLUMN field_${field.id} ${ItemTableQueries.types[field.type]}`;
        if (field.required) {
            sql += ' NOT NULL';
        }
        return sql;
    });

    readonly MODIFY_COLUMN: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        let sql = `ALTER TABLE ${this.prefix}item_${field.typeId} MODIFY COLUMN field_${field.id} ${ItemTableQueries.types[field.type]}`;
        if (field.required) {
            sql += ' NOT NULL';
        }
        return sql;
    });

    readonly DROP_COLUMN: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        return `ALTER TABLE ${this.prefix}item_${field.typeId} DROP COLUMN field_${field.id}`;
    });

    readonly ADD_FOREIGN_KEY: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        const name = `field_${field.id}`;
        return `ALTER TABLE ${this.prefix}item_${field.typeId}
            ADD CONSTRAINT ${name} FOREIGN KEY (${name})
              REFERENCES ${this.prefix}item_${field.reference.typeId}(id)
              ON DELETE SET NULL
              ON UPDATE CASCADE`;
    });

    readonly DROP_FOREIGN_KEY: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        return `ALTER TABLE ${this.prefix}item_${field.typeId} DROP FOREIGN KEY field_${field.id}`;
    });

    readonly ADD_UNIQUE_INDEX: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        const name = `field_${field.id}`;
        return `ALTER TABLE ${this.prefix}item_${field.typeId} ADD CONSTRAINT ${name} UNIQUE INDEX (${name})`;
    });

    readonly DROP_UNIQUE_INDEX: DynamicQuery<ObjectResultsets, TypeField> = this.dynamic((field: TypeField) => {
        return `ALTER TABLE ${this.prefix}item_${field.typeId} DROP INDEX field_${field.id}`;
    });
}