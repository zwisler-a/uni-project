export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    prefix: string;
}

export interface SslConfig {
    enabled: boolean;
    cert: string;
    key: string;
}

export interface Config {
    host?: string;
    port?: number;
    socket?: string;
    ssl: SslConfig;
    database: DatabaseConfig;
}

export class ApiError extends Error {
    status: number;
    cause: any;

    constructor(name: string, message: string, status: number, cause?: any) {
        super();

        this.name = name;
        this.message = message;
        this.status = status;

        if (cause instanceof Error) {
            this.cause = {
                name: cause.name,
                message: cause.message
            };
        } else {
            this.cause = cause;
        }
    }
}