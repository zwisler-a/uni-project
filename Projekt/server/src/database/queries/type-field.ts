import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class TypeFieldQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}types_field (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            typeId MEDIUMINT UNSIGNED NOT NULL,
            name VARCHAR(64) NOT NULL,
            type ENUM('string', 'number', 'boolean', 'file', 'color', 'date', 'reference') NOT NULL,
            required BIT NOT NULL,
            unique BIT NOT NULL,
            referenceId INT UNSIGNED,
            PRIMARY KEY (id),
            UNIQUE INDEX (typeId, name),
            FOREIGN KEY (typeId)
              REFERENCES ${this.prefix}types(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE_TABLE_FOREIGN_KEY: StaticQuery<ObjectResultsets> = this.sql(
        `ALTER TABLE ${this.prefix}types_field
            ADD FOREIGN KEY (referenceId)
              REFERENCES ${this.prefix}types_field(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}types_field
            (id, typeId, name, type, required, unique, referenceId)
            VALUES (NULL,?,?,?,?,?,?)`);

    readonly GET_ID: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}types_field
            WHERE id = ?`);

    readonly GET_TYPE: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}types_field
            WHERE typeId = ?`);

    readonly GET_REFERENCE: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}types_field
            WHERE referenceId = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}types_field
            SET name = ?, type = ?, required = ?, unique = ?, referenceId = ?
            WHERE id = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}types_field
            WHERE id = ?`);
}