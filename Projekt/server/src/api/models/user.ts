import { ObjectValidator, Schema } from '../../util/object-validator';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Represents an User
 * @author Maurice
 */
export interface User {
    /** User's unique id */
    id?: number;
    /** Id of the user's company */
    companyId: number;
    /** User's unique name */
    name: string;
    /** User's password */
    password: string;
    /** User's email address */
    email?: string;
}

/**
 * Get's the schema for the {@link User}
 * @param required should required be enabled
 * @returns schema for an {@link ObjectValidator}
 */
function userSchema(required: boolean): Schema {
    return {
        type: Object,
        required: true,
        properties: {
            companyId: {
                type: Number,
                required
            },
            name: {
                type: String,
                required,
                range: {
                    min: 2,
                    max: 32
                }
            },
            password: {
                type: String,
                required,
                range: {
                    min: 8,
                    max: 64
                },
                validator: (value: string, path: string) => {
                    if (!value.match(/[a-z]/g) || !value.match(/[A-Z]/g) || !value.match(/[0-9]/g) || !value.match(/[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]/g)) {
                        throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_STRING_FORMAT, path);
                    }
                }
            },
            email: {
                type: String,
                nullable: true
            }
        }
    };
}

export const USER_AUTH = new ObjectValidator<User>({
    type: Object,
    required: true,
    properties: {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
});

/** Object validator for creating {@link User} */
export const USER_CREATE = new ObjectValidator<User>(userSchema(true));

/** Object validator for updating {@link User} */
export const USER_PATCH = new ObjectValidator<User>(userSchema(false));

