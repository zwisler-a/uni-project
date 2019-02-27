import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class GlobalQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}global (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            companyId MEDIUMINT UNSIGNED NOT NULL,
            name VARCHAR(64) NOT NULL,
            type ENUM('string', 'number', 'boolean', 'file', 'color', 'date') NOT NULL,
            required BIT NOT NULL,
            \`unique\` BIT NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX (companyId, name),
            FOREIGN KEY (companyId)
              REFERENCES ${this.prefix}company(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}global
            (id, companyId, name, type, required, \`unique\`)
            VALUES (NULL,?,?,?,?,?)`);

    readonly GET_COMPANY: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}global
            WHERE companyId = ?`);

    readonly GET_ID: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}global
            WHERE id = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}global
            SET name = ?, type = ?, required = ?, \`unique\` = ?
            WHERE id = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}global
            WHERE id = ?`);
}