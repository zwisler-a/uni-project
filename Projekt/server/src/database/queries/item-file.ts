import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class ItemFileQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}item_file (
            fieldId INT UNSIGNED NOT NULL,
            itemId INT UNSIGNED NOT NULL,
            timestamp DATETIME NOT NULL,
            name VARCHAR(512) NOT NULL,
            mime VARCHAR(256) NOT NULL,
            PRIMARY KEY (fieldId, itemId, timestamp),
            FOREIGN KEY (fieldId)
              REFERENCES ${this.prefix}types_field(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}item_file
            (fieldId, itemId, timestamp, name, mime)
            VALUES (?,?,?,?,?)`);

    readonly GET: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}item_file
            WHERE fieldId = ?`);

    readonly GET_ITEM: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}item_file
            WHERE fieldId = ? AND itemId = ?`);

    readonly GET_TIMESTAMP: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}item_file
            WHERE fieldId = ? AND itemId = ? AND timestamp = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}item_file
            WHERE fieldId = ? AND itemId = ?`);
}