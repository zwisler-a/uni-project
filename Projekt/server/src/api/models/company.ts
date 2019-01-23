import { ObjectValidator } from './object-validator';

/**
 * Represents a company
 * @author Maurice
 */
export interface Company {
    /** Company's unique id */
    id?: number;
    /** Company's unique name */
    name: string;
}

/** Object validator for {@link Company} */
export const COMPANY = new ObjectValidator<Company>({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
    }
});

