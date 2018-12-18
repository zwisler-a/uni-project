export class DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    prefix: string;
}

export class SslConfig {
    enabled: boolean;
    cert: string;
    key: string;
}

export class Config {
    host: string;
    port: number;
    ssl: SslConfig;
    http2: boolean;
    database: DatabaseConfig;
}