import { ApiError, ErrorNumber } from '../../types';

/**
 * Helper class for object schema validation
 * @author Maurice
 */
export class ObjectValidator<T> {
    /** Validation schema */
    schema: any;

    /**
     * Creates a new ObjectValidator
     * @param schema Schema used for validation
     */
    constructor(schema: any) {
        this.schema = schema;
    }

    /**
     * Validates if an object corresponds to the defined schema
     * @param object object to validate
     * @returns the validated object as T
     * @throws {@link ApiError} when validation failed
     */
    validate(object: any): T {
        this.verify(object, this.schema);
        return object as T;
    }

    /**
     * Helper function for error building
     * @param errorNumber Error's unique id
     * @param field which field is affected
     * @param expected what was expected
     * @param got what was the actual value
     */
    private error(errorNumber: ErrorNumber, field: string, expected?: any, got?: any): ApiError {
        if (typeof expected === 'undefined') {
            return ApiError.BAD_REQUEST(errorNumber, field);
        }
        return ApiError.BAD_REQUEST(errorNumber, { field, expected, got });
    }

    /**
     * This function walks along objects and validates its fields
     * @param object Object to validate fields from
     * @param schema Shema to validate against
     */
    private verify(object: any, schema: any) {
        for (const key in schema) {
            const field = schema[key];
            const value = object[key];

            if (typeof value === 'undefined') {
                if (field.required) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_MISSING, key);
                } else {
                    continue;
                }
            }

            if (value === null) {
                if (field.nullable) {
                    continue;
                } else {
                    throw this.error(ErrorNumber.REQUEST_FIELD_NULL, key);
                }
            }

            if (field.type === Boolean && typeof value !== 'boolean') {
                throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, key, 'boolean', typeof value);
            }

            if (field.type === Number) {
                if (typeof value !== 'number') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, key, 'number', typeof value);
                }

                if ('min' in field && value < field.min) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_MIN, key, field.min, value);
                }

                if ('max' in field && value > field.max) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_MAX, key, field.max, value);
                }
            }

            if (field.type === String) {
                if (typeof value !== 'string') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, key, 'string', typeof value);
                }

                if ('length' in field) {
                    const { min, max } = field.length;
                    const length = value.length;

                    if (length < min || length > max) {
                        throw this.error(ErrorNumber.REQUEST_FIELD_LENGTH, key, field.length, length);
                    }
                }

                if ('enum' in field && !field.enum.includes(value)) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_ENUM, key, field.enum, value);
                }
            }

            if (field.type === Array) {
                if (!Array.isArray(value)) {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, key, 'array', typeof value);
                }

                if ('elements' in field) {
                    for (const item of value) {
                        this.verify(item, field.elements);
                    }
                }
            }

            if (field.type === Object) {
                if (typeof value !== 'object') {
                    throw this.error(ErrorNumber.REQUEST_FIELD_TYPE, key, 'object', typeof value);
                }

                if ('properties' in field) {
                    this.verify(value, field.properties);
                }
            }

            if ('validator' in field) {
                field.validator(value);
            }
        }
    }
}
