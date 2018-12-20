import { Pool } from '../../types/mariadb';

function queryFactory(sql: string) {
    return (pool: Pool, values?: any[] | any) => {
        return pool.query(sql, values);
    };
}

export const CREATE_TABLE_USER = queryFactory('CREATE TABLE IF NOT EXISTS `account` (`id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL, `password` VARCHAR(60) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX (`name`));');

export const USER_CREATE = queryFactory('INSERT INTO `account`(`id`, `name`, `password`) VALUES (NULL,?, ?)');
export const USER_GET = queryFactory('SELECT * FROM `account` WHERE `name` = ?');
