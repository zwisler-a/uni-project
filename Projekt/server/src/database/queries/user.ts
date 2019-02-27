import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class UserQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            companyId MEDIUMINT UNSIGNED NOT NULL,
            name VARCHAR(64) NOT NULL,
            password VARCHAR(60) NOT NULL,
            email VARCHAR(128),
            PRIMARY KEY (id),
            UNIQUE INDEX (name),
            UNIQUE INDEX (email),
            FOREIGN KEY (companyId)
              REFERENCES ${this.prefix}company(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}users
            (id, companyId, name, password, email)
            VALUES (NULL,?,?,?,?)`);

    readonly GET: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}users`);

    readonly GET_ID: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}users
            WHERE id = ?`);

    readonly GET_NAME: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}users
            WHERE name = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}users
            SET name = ?, password = ?, email = ?
            WHERE id = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}users
            WHERE id = ?`);
}