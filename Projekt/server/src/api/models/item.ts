import { ObjectValidator } from '../../util/object-validator';
import { Type } from './type';

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
    global: boolean;
    /** The field's display value */
    reference?: any;
}

/**
 * A combine object of Types and Items
 */
export class EmbeddedItem {
    /** The Types need to understand all items in the items[] */
    types: Type[];
    /** List of all items */
    items: Item[];

    /**
     * Creates a new EmbeddedItem
     * @param types All Types used by the given Items
     * @param items List of Items
     */
    constructor(types: Type[], items: Item[]) {
        this.types = types;
        this.items = items;
    }
}

export const ITEM = new ObjectValidator<Field[]>({
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
            },
            global: {
                type: Boolean,
                required: true
            }
        }
    }
});