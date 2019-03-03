import debug from 'debug';
import fs from 'fs-extra';
import path from 'path';
import mariadb from 'mariadb';

import { Config } from './types';
import { initializeDatabaseController } from './database/controller';

import { Type } from './api/models/type';
import { TypeModel } from './database/models/type';

import { Company } from './api/models/company';
import { CompanyModel } from './database/models/company';

import { Role } from './api/models/role';
import { RoleModel } from './database/models/role';

import { User } from './api/models/user';
import { UserModel } from './database/models/user';

import { ItemModel } from './database/models/item';


const configFile = path.resolve(process.argv[process.argv.length - 1] || './config.json');
if (!fs.existsSync(configFile)) {
    throw new Error(`No config file found: "${configFile}"`);
}

const config: Config = fs.readJsonSync(configFile);

if (process.argv.indexOf('--debug') !== -1) {
    debug.enable('*');
}

(async () => {
    try {
        const database = config.database;
        const dbConnection = await mariadb.createConnection({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
        });
        await dbConnection.query(`DROP DATABASE ${config.database.database}`);
        await dbConnection.query(`CREATE DATABASE ${config.database.database}`);
        await dbConnection.end();

        const dbPool = mariadb.createPool({
            host: database.host,
            port: database.port,
            user: database.user,
            password: database.password,
            database: database.database,
            connectionLimit: 50
        });
        await initializeDatabaseController(dbPool, config.database.prefix);

        const time = Date.now();
        const company: Company = await CompanyModel.create({
            name: 'ak18b'
        });
        const room: Type = await TypeModel.create({
            name: 'Raum',
            companyId: company.id,
            fields: [
                {
                    name: 'Lager',
                    type: 'boolean',
                    required: true,
                    unique: false
                },
                {
                    name: 'Raumnummer',
                    type: 'number',
                    required: true,
                    unique: true
                }
            ]
        });
        const roomStorage: number = room.fields.find(field => field.name === 'Lager').id;
        const roomNumber: number = room.fields.find(field => field.name === 'Raumnummer').id;
        const drive: Type = await TypeModel.create({
            name: 'Speichermedium',
            companyId: company.id,
            fields: [
                {
                    name: 'Defekt',
                    type: 'boolean',
                    required: true,
                    unique: false
                },
                {
                    name: 'Speichergröße',
                    type: 'string',
                    required: true,
                    unique: false
                },
                {
                    name: 'SSD',
                    type: 'boolean',
                    required: true,
                    unique: false
                }
            ]
        });
        const driveMalfunction: number = drive.fields.find(field => field.name === 'Defekt').id;
        const driveSize: number = drive.fields.find(field => field.name === 'Speichergröße').id;
        const driveSSD: number = drive.fields.find(field => field.name === 'SSD').id;
        const laptop: Type = await TypeModel.create({
            name: 'Laptop',
            companyId: company.id,
            fields: [
                {
                    name: 'Farbe',
                    type: 'color',
                    required: true,
                    unique: false
                },
                {
                    name: 'Mac-Adresse',
                    type: 'string',
                    required: true,
                    unique: true
                },
                {
                    name: 'Defekt',
                    type: 'boolean',
                    required: true,
                    unique: false
                },
                {
                    name: 'Raum',
                    type: 'reference',
                    required: false,
                    unique: false,
                    referenceId: roomNumber
                },
                {
                    name: 'Speichergröße',
                    type: 'reference',
                    required: false,
                    unique: false,
                    referenceId: driveSize
                }
            ]
        });
        const laptopColor: number = laptop.fields.find(field => field.name === 'Farbe').id;
        const laptopAddress: number = laptop.fields.find(field => field.name === 'Mac-Adresse').id;
        const laptopMalfunction: number = laptop.fields.find(field => field.name === 'Defekt').id;
        const laptopRoom: number = laptop.fields.find(field => field.name === 'Raum').id;
        const laptopDrive: number = laptop.fields.find(field => field.name === 'Speichergröße').id;
        await Promise.all(Array(250).fill(null).map((_, i) => ItemModel.create(company.id, room.id, [
            {
                id: roomStorage,
                global: false,
                value: Math.random() < 0.1
            },
            {
                id: roomNumber,
                global: false,
                value: i + 1
            }
        ])));
        await Promise.all(Array(250).fill(null).map((_, i) => ItemModel.create(company.id, drive.id, [
            {
                id: driveMalfunction,
                global: false,
                value: Math.random() < 0.1
            },
            {
                id: driveSize,
                global: false,
                value: ['256GB', '512GB', '1TB', '2TB'][i % 4]
            },
            {
                id: driveSSD,
                global: false,
                value: Math.random() < 0.8
            }
        ])));
        for (let i = 0; i < 500; i++) {
            await ItemModel.create(company.id, laptop.id, [
                {
                    id: laptopColor,
                    global: false,
                    value: `#${Array(6).fill(null).map(_ => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')}`
                },
                {
                    id: laptopAddress,
                    global: false,
                    value: Array(6).fill(null).map(_ => `${Math.ceil(Math.random() * 0xF0 + 0xF).toString(16)}`).join('-')
                },
                {
                    id: laptopMalfunction,
                    global: false,
                    value: Math.random() < 0.1
                },
                {
                    id: laptopRoom,
                    global: false,
                    value: Math.ceil(250 * Math.random())
                },
                {
                    id: laptopDrive,
                    global: false,
                    value: Math.ceil(250 * Math.random())
                }
            ]);
        }
        const systemAdmin: Role = await RoleModel.create({
            name: 'System Admin',
            companyId: company.id,
            permission: 0x3F,
            types: {}
        });
        const admin: Role = await RoleModel.create({
            name: 'Admin',
            companyId: company.id,
            permission: 0x1F,
            types: {}
        });
        const technician: Role = await RoleModel.create({
            name: 'Techniker',
            companyId: company.id,
            permission: 0x0F,
            types: {}
        });
        const specialist: Role = await RoleModel.create({
            name: 'Fachmann',
            companyId: company.id,
            permission: 0x07,
            types: {}
        });
        const write: Role = await RoleModel.create({
            name: 'Schreiben',
            companyId: company.id,
            permission: 0x03,
            types: {}
        });
        const read: Role = await RoleModel.create({
            name: 'Lesen',
            companyId: company.id,
            permission: 0x01,
            types: {}
        });
        const superUser: User = await UserModel.create({
            companyId: company.id,
            name: 'superuser',
            password: 'password',
            roles: [ systemAdmin.id ]
        });
        console.log(`${Date.now() - time}ms DONE!`);

        dbPool.end();
    } catch (error) {
        console.log(error);
    }
})();