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
    host?: string;
    port?: number;
    socket?: string;
    ssl: SslConfig;
    http2: boolean;
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