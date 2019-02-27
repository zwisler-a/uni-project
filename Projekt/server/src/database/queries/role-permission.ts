import { ObjectResultsets, ArrayResultsets } from 'mariadb';
import { StaticQuery, Queries } from '../query';

export class RolePermissionQueries extends Queries {

    readonly CREATE_TABLE: StaticQuery<ObjectResultsets> = this.sql(
        `CREATE TABLE IF NOT EXISTS ${this.prefix}roles_permissions (
            roleId INT UNSIGNED NOT NULL,
            typeId MEDIUMINT UNSIGNED NOT NULL,
            permissions BIT(3) NOT NULL,
            PRIMARY KEY (roleId, typeId),
            FOREIGN KEY (roleId)
              REFERENCES ${this.prefix}roles (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
            FOREIGN KEY (typeId)
              REFERENCES ${this.prefix}types (id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`);

    readonly CREATE: StaticQuery<ObjectResultsets> = this.sql(
        `INSERT INTO ${this.prefix}roles_permissions
            (roleId, typeId, permissions)
            VALUES (?,?,?)`);

    readonly GET: StaticQuery<ArrayResultsets> = this.sql(
        `SELECT * FROM ${this.prefix}roles_permissions
            WHERE roleId = ?`);

    readonly UPDATE: StaticQuery<ObjectResultsets> = this.sql(
        `UPDATE ${this.prefix}roles_permissions
            SET permissions = ?
            WHERE roleId = ? AND typeId = ?`);

    readonly DELETE: StaticQuery<ObjectResultsets> = this.sql(
        `DELETE FROM ${this.prefix}roles_permissions
            WHERE roleId = ? AND typeId = ?`);
}