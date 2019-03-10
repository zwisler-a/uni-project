import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class UserRoleQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}users_roles (
            userId INT UNSIGNED NOT NULL,
            roleId INT UNSIGNED NOT NULL,
            PRIMARY KEY (userId, roleId),
            FOREIGN KEY (userId)
              REFERENCES ${this.prefix}users (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
            FOREIGN KEY (roleId)
              REFERENCES ${this.prefix}roles (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}users_roles
            (userId, roleId)
            VALUES (?,?)`);

    readonly GET_USER: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}users_roles
            WHERE userId = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}users_roles
            WHERE userId = ? AND roleId = ?`);
}