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

export enum ErrorNumber {
    REQUEST_URL_NUMBER_FORMAT,

    REQUEST_ENTITY_TYPE,

    REQUEST_FIELD_MISSING,
    REQUEST_FIELD_TYPE,
    REQUEST_FIELD_ENUM,
    REQUEST_FIELD_LENGTH,
    REQUEST_FIELD_MIN,
    REQUEST_FIELD_MAX,
    REQUEST_FIELD_NUMBER_FORMAT,
    REQUEST_FIELD_DATE_FORMAT,

    TYPE_NOT_FOUND,
    TYPE_REFERENCE_NOT_FOUND
}

export class ApiError extends Error {
    status: number;
    errorNumber: ErrorNumber;
    errorName: string;
    cause: any;

    static BAD_REQUEST(errorNumber: ErrorNumber, cause?: any) {
        return new ApiError('Bad Request', 'The server cannot or will not process the request due to a client error', 400, errorNumber, cause);
    }

    static NOT_FOUND(errorNumber: ErrorNumber, cause?: any) {
        return new ApiError('Not found', 'The requested resource could not be found but may be available in the future', 404, errorNumber, cause);
    }

    constructor(name: string, message: string, status: number, errorNumber: ErrorNumber, cause?: any) {
        super();

        this.name = name;
        this.message = message;
        this.status = status;
        this.errorNumber = errorNumber;
        this.errorName = ErrorNumber[errorNumber];

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

export class OldApiError extends Error {
    status: number;
    cause: any;

    public static readonly BAD_REQUEST = new OldApiError('Bad Request', 'The request is invalid', 400);
    public static readonly NOT_FOUND = new OldApiError('Not found', 'The requested resource could not be found but may be available in the future', 500);

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