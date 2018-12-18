import { Config } from '../src/config';

export const config: Config = {
    host: '0.0.0.0',
    port: 0,
    ssl: {
        enabled: false,
        cert: null,
        key: null
    },
    http2: false,
    database: {
        host: 'mariadb',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ak18b',
        prefix: 'ak18b_'
    }
};