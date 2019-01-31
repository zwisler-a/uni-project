import { ObjectValidator } from '../../util/object-validator';

/**
 * Represents an item (entity) of specific Type
 * @author Maurice
 */
export interface Item {
    /** Id of this item's type */
    typeId?: number;
    /** unique interal type specific item id */
    id?: number;
    /** Item's Field[] containing the item's values */
    fields: Field[];
    globals: Field[];
}

/**
 * Represents a value of a specific field of an item
 * @author Maurice
 */
export interface Field {
    /** The field's unique id */
    id: number;
    /** The field's value */
    value: any;
    /** The field's display value */
    reference?: any;
}

export const ITEM = new ObjectValidator<Item>({
    type: Object,
    required: true,
    properties: {
        fields: {
            type: Array,
            required: true,
            elements: {
                type: Object,
                required: true,
                properties: {
                    id: {
                        type: Number,
                        required: true
                    },
                    value: {
                        required: true
                    }
                }
            }
        },
        globals: {
            type: Array,
            required: true,
            elements: {
                type: Object,
                required: true,
                properties: {
                    id: {
                        type: Number,
                        required: true
                    },
                    value: {
                        required: true
                    }
                }
            }
        }
    }
});