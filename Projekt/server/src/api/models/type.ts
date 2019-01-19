/**
 * Represents the type (metadata) of an item
 * @author Maurice
 */
export interface Type {
    /** Type's unique id */
    id: number;
    /** Id of company that owns this type */
    companyId: number;
    /** Type's unique name */
    name: string;
    /** Type's representative field */
    representative: number;
    /** List of all the field's an item of this type (should) have */
    fields: TypeField[];
}

/**
 * Represents a field inside a type
 * @author Maurice
 */
export interface TypeField {
    /** The field's unique id */
    id: number;
    /** The id of the type this field belongs to */
    typeId: number;
    /** The field's type specifiy unique name */
    name: string;
    /** The field's {@link TypeFieldType} */
    type: string;
    /** True if the field shouldn't be nullable */
    required: boolean;
    /** True if the field's value should be unique among one type */
    unique: boolean;
    /** The this field's value references (only present if type === 'reference') */
    referenceId?: number;
}

/**
 * Represents the type of the value of a {@link TypeField}
 * @author Maurice
 */
export enum TypeFieldType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    file = 'file',
    color = 'color',
    date = 'date',
    reference = 'reference'
}
