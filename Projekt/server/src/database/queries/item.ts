import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { DynamicQuery, Queries } from '../query';
import { Type, TypeField, TypeFieldType, FullType } from '../../api/models/type';
import { GlobalField } from '../../api/models/global';
import { Field } from '../../api/models/item';

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

    readonly CREATE: DynamicQuery<ObjectResultsets, FullType> = this.dynamic((type: FullType) => {
        let fields = 'id';
        let values = 'NULL';
        type.fields.forEach((field: TypeField) => {
            fields += `, field_${field.id}`;
            values += ', ?';
        });
        return `INSERT INTO ${this.prefix}item_${type.id} (${fields}) VALUES (${values})`;
    });

    readonly CREATE_GLOBAL: DynamicQuery<ObjectResultsets, FullType> = this.dynamic((type: FullType) => {
        let fields = 'typeId, id';
        let values = '?, ?';
        type.globals.forEach((field: GlobalField) => {
            fields += `, global_${field.id}`;
            values += ', ?';
        });
        return `INSERT INTO ${this.prefix}global_${type.companyId} (${fields}) VALUES (${values})`;
    });

    readonly GET: DynamicQuery<ArrayResultsets, Sortable<FullType, { id: number, global: boolean }>> = this.dynamic(({ value, sorter, order }) => {
        let sql = this.itemSelectQuery(value, value.globals);

        if (typeof sorter !== 'undefined') {
            if (sorter.global) {
                sql += ` ORDER BY global_${sorter.id} ${order}`;
            } else {
                sql += ` ORDER BY field_${sorter.id} ${order}`;
            }
        }

        return sql;
    });

    readonly GET_RANGE: DynamicQuery<ArrayResultsets, Sortable<FullType, { id: number, global: boolean }>> = this.dynamic((sortable: Sortable<FullType, Field>) => {
        return `${this.GET.builder(sortable)} LIMIT ?, ?`;
    });

    readonly GET_ID: DynamicQuery<ArrayResultsets, FullType> = this.dynamic((type: FullType) => {
        return `${this.itemSelectQuery(type, type.globals)} WHERE ${this.prefix}item_${type.id}.id = ?`;
    });

    readonly COUNT: DynamicQuery<ArrayResultsets, number> = this.dynamic((id: number) => {
        return `SELECT COUNT(*) FROM ${this.prefix}item_${id}`;
    });

    readonly UPDATE: DynamicQuery<ObjectResultsets, FullType> = this.dynamic((type: FullType) => {
        let set = '';
        type.fields.forEach((field: TypeField, index: number) => {
            if (index !== 0) {
                set += ',';
            }
            set += ` field_${field.id} = ?`;
        });
        return `UPDATE ${this.prefix}item_${type.id} SET ${set} WHERE id = ?`;
    });

    readonly UPDATE_GLOBAL: DynamicQuery<ObjectResultsets, FullType> = this.dynamic((type: FullType) => {
        let set = '';
        type.globals.forEach((field: GlobalField, index: number) => {
            if (index !== 0) {
                set += ',';
            }
            set += ` global_${field.id} = ?`;
        });
        return `UPDATE ${this.prefix}global_${type.companyId} SET ${set} WHERE typeId = ? AND id = ?`;
    });

    readonly DELETE: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `DELETE FROM ${this.prefix}item_${id} WHERE id = ?`;
    });

    readonly DELETE_GLOBAL: DynamicQuery<ObjectResultsets, number> = this.dynamic((id: number) => {
        return `DELETE FROM ${this.prefix}global_${id} WHERE typeId = ? AND id = ?`;
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