import { ApiError, ErrorNumber } from '../types';

export interface Schema {
    required?: boolean;
    nullable?: boolean;
    type?: any;
    range?: {
        min?: number;
        max?: number;
    };
    enum?: string[];
    elements?: Schema;
    properties?: {
        [key: string]: Schema
    };
    validator?: (value: any, path: string) => void;
}

/**
 * Helper class for request body schema validation
 * @author Maurice
 */
export class ObjectValidator<T> {
    /** Validation schema */
    schema: Schema;

    /**
     * Creates a new ObjectValidator
     * @param schema Schema used for validation
     */
    constructor(schema: Schema) {
        this.schema = schema;
    }

    /**
     * Validates anything against the defined schema
     * @param value value to validate
     * @returns the validated value as T
     * @throws {@link ApiError} when validation failed
     */
    validate(value: any): T {
        this.verify(this.schema, value, '_root');
        return value as T;
    }

    /**
     * Helper function for error building
     * @param errorNumber Error's unique id
     * @param path which path is affected
     * @param expected what was expected
     * @param got what was the actual value
     */
    private error(errorNumber: ErrorNumber, path: string, expected?: any, got?: any): ApiError {
        if (typeof expected === 'undefined') {
            return ApiError.BAD_REQUEST(errorNumber, path);
        }
        return ApiError.BAD_REQUEST(errorNumber, { path, expected, got });
    }

    /**
     * Helper function for range checks
     * @param range range object to check against
     * @param value value to check
     * @param path current path
     */
    private range(range: { min?: number, max?: number }, value: number, path: string) {
        if ('min' in range && value < range.min) {
            throw this.error(ErrorNumber.REQUEST_FIELD_MIN, path, range.min, value);
        }
        if ('max' in range && value > range.max) {
            throw this.error(ErrorNumber.REQUEST_FIELD_MAX, path, range.max, value);
        }
    }

    /**
     * This function validates it the value with the given schema
     * @param schema Shema to validate against
     * @param value Value to validate
     * @param path Path to the current value, e.g. ```_root.roles[1].name```
     */
    private verify(schema: Schema, value: any, path: string) {
        if (typeof value === 'undefined') {
            if (schema.required) {
                throw this.error(ErrorNumber.REQUEST_FIELD_MISSING, path);
            } else {
                return;
            }
        }

        if (value === null) {
            if (schema.nullable) {
                return;
            } else {
                throw this.error(ErrorNumber.REQUEST_FIELD_NULL, path);
            }
        }

        if ('type' in schema) {
            if (schema.type === Boolean && typeof value !== 'boolean') {
                throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, path, 'boolean', typeof value);
            }

            if (schema.type === Number) {
                if (typeof value !== 'number') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, path, 'number', typeof value);
                }

                if ('range' in schema) {
                    this.range(schema.range, value, path);
                }
            }

            if (schema.type === String) {
                if (typeof value !== 'string') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, path, 'string', typeof value);
                }

                if ('range' in schema) {
                    const { min, max } = schema.range;
                    const length = value.length;

                    if (length < min || length > max) {
                        throw this.error(ErrorNumber.REQUEST_FIELD_LENGTH, path, schema.range, length);
                    }
                }

                if ('enum' in schema && schema.enum.indexOf(value) === -1) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_ENUM, path, schema.enum, value);
                }
            }

            if (schema.type === Array) {
                if (!Array.isArray(value)) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, path, 'array', typeof value);
                }

                if ('elements' in schema) {
                    let i = 0;
                    for (const item of value) {
                        this.verify(schema.elements, item, `${path}.[${i++}]`);
                    }
                }

                if ('range' in schema) {
                    this.range(schema.range, value.length, path);
                }
            }

            if (schema.type === Object) {
                if (typeof value !== 'object') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, path, 'object', typeof value);
                }

                if ('properties' in schema) {
                    for (const key in schema.properties) {
                        this.verify(schema.properties[key], value[key], `${path}.${key}`);
                    }
                }

                if ('elements' in schema) {
                    for (const key in value) {
                        this.verify(schema.elements, value[key], `${path}.${key}`);
                    }
                }
            }
        }

        if ('validator' in schema) {
            schema.validator(value, path);
        }
    }
}
