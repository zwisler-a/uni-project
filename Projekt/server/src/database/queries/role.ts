import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class RoleQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}roles (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            companyId MEDIUMINT UNSIGNED NOT NULL,
            name VARCHAR(64) NOT NULL,
            permissions BIT(4) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX (name),
            FOREIGN KEY (companyId)
              REFERENCES ${this.prefix}company (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}roles
            (id, companyId, name, permissions)
            VALUES (NULL,?,?,?)`);

    readonly GET_COMPANY: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}roles
            WHERE companyId = ?`);

    readonly GET_ID: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}roles
            WHERE id = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}roles
            SET name = ?, permissions = ?
            WHERE id = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}roles
            WHERE id = ?`);
}