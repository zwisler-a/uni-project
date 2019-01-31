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
    /** Reference */
    referenceFieldId?: number;
    /** type id of the referencing object */
    referenceId?: number;
}
