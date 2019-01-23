import { ObjectValidator } from './object-validator';

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
}

/** Object validator for {@link Company} */
export const USER = new ObjectValidator<User>({
    companyId: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

