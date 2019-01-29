import { ObjectValidator } from '../../util/object-validator';

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
    /** The this field's value referenceId to another field of a different type (only present if type === 'reference') */
    referenceId?: number;
    /** The referenced field */
    reference?: TypeField;
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

export const TYPE = new ObjectValidator<Type>({
    type: Object,
    required: true,
    properties: {
        companyId: {
            type: Number
            // TODO maybe required?
        },
        name: {
            type: String,
            required: true
        },
        fields: {
            type: Array,
            required: true,
            elements: {
                type: Object,
                required: true,
                properties: {
                    id: {
                        type: Number
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    type: {
                        type: String,
                        required: true,
                        enum: [ 'string', 'number', 'boolean', 'file', 'color', 'date', 'reference' ]
                    },
                    required: {
                        type: Boolean,
                        required: true
                    },
                    unique: {
                        type: Boolean,
                        required: true
                    },
                    referenceId: {
                        type: Number
                    }
                }
            }
        }
    }
});