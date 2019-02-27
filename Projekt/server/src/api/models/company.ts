import { ObjectValidator } from '../../util/object-validator';

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
    type: Object,
    required: true,
    properties: {
        name: {
            type: String,
            required: true,
            range: {
                min: 1,
                max: 64
            }
        }
    }
});

