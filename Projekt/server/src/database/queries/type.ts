import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class TypeQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}types (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            companyId MEDIUMINT UNSIGNED NOT NULL,
            name VARCHAR(64) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX (companyId, name),
            FOREIGN KEY (companyId)
              REFERENCES ${this.prefix}company(id)
              ON DELETE RESTRICT
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}types
            (id, companyId, name)
            VALUES (NULL,?,?)`);

    readonly GET_COMPANY: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}types
            WHERE companyId = ?`);

    readonly GET_ID: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}types
            WHERE id = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}types
            SET name = ?
            WHERE id = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}types
            WHERE id = ?`);
}