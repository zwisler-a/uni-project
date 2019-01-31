import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { DynamicQuery, Queries } from '../query';
import { Type, TypeField, TypeFieldType } from '../../api/models/type';
import { GlobalField } from '../../api/models/global';

export enum SortOrder {
    DESC = 'DESC',
    ASC = 'ASC'
}

export interface Sortable<U, V> {
    value: U;
    sorter?: V;
    order?: SortOrder;
}

export class ItemQueries extends Queries {

    readonly CREATE: DynamicQuery<ObjectResultsets, Type> = this.dynamic((type: Type) => {
        let values = 'NULL';
        let sql = `INSERT INTO ${this.prefix}item_${type.id} (id`;
        type.fields.forEach(function(field: TypeField) {
            sql += `, field_${field.id}`;
            values += ', ?';
        });
        sql += ') VALUES (';
        sql += values + ')';
        return sql;
    });

    readonly GET: DynamicQuery<ArrayResultsets, Sortable<Type, TypeField>> = this.dynamic(({ value, sorter, order }) => {
        let sql = this.itemSelectQuery(value, []);

        if (typeof sorter !== 'undefined') {
            // TODO `table`.`field` + `table`.`global`
            sql += ` ORDER BY ${this.prefix}item_${sorter.typeId}.field_${sorter.id} ${order}`;
        }

        return sql;
    });

    readonly GET_RANGE: DynamicQuery<ArrayResultsets, Sortable<Type, TypeField>> = this.dynamic((sortable: Sortable<Type, TypeField>) => {
        return `${this.GET.builder(sortable)} LIMIT ?, ?`;
    });

    readonly GET_ID: DynamicQuery<ArrayResultsets, Type> = this.dynamic((type: Type) => {
        return `${this.itemSelectQuery(type, [])} WHERE ${this.prefix}item_${type.id}.id = ?`;
    });

    readonly COUNT: DynamicQuery<ArrayResultsets, number> = this.dynamic((id: number) => {
        return `SELECT COUNT(*) FROM ${this.prefix}item_${id}`;
    });

    readonly UPDATE: DynamicQuery<ObjectResultsets, Type> = this.dynamic((type: Type) => {
        let sql = `UPDATE ${this.prefix}item_${type.id} SET`;
        type.fields.forEach(function(field: TypeField, index: number) {
            if (index !== 0) {
                sql += ',';
            }
            sql += ` field_${field.id} = ?`;
        });
        sql += ' WHERE `id` = ?';
        return sql;
    });

    readonly DELETE: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `DELETE FROM ${this.prefix}item_${id} WHERE id = ?`;
    });

    private itemSelectQuery(type: Type, globals: GlobalField[]) {
        const table = `${this.prefix}item_${type.id}`;
        let select = `SELECT ${table}.*`;
        let from = `FROM ${table}`;

        for (const field of type.fields) {
            if (field.type === TypeFieldType.reference) {
                const referenceTable = `${this.prefix}item_${field.reference.typeId}`;
                select += `, ${referenceTable}.field_${field.reference.id}`;
                from += ` LEFT JOIN ${referenceTable} ON ${table}.field_${field.id} = ${referenceTable}.id`;
            }
        }

        if (globals.length !== 0) {
            const globalTable = `${this.prefix}global_${type.companyId}`;
            for (const global of globals) {
                select += `, ${globalTable}.global_${global.id}`;
            }
            from += ` LEFT JOIN ${globalTable} ON ${table}.id = ${globalTable}.id AND ${globalTable}.typeId = ${type.id}`;
        }

        return `${select} ${from}`;
    }
}