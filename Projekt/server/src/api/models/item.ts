/**
 * Represents an item (entity) of specific Type
 * @author Maurice
 */
export interface Item {
    /** Id of this item's type */
    typeId: number;
    /** unique interal type specific item id */
    id: number;
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
}