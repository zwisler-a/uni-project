/** A property of an item */
export interface Field {
    name: string;
    id: number;
    type: string;
    value: any;
    required: boolean;
    unique: boolean;
    /** String which represents the field value */
    displayValue: string;
    /** Value of its referencing object */
    referenceValue?: any;
    /** Id of the field referenced */
    referenceFieldId?: number;
    /** Id of the type referenced */
    referenceTypeId?: number;
}
