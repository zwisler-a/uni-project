/** A property of an item */
export interface Field {
    name: string;
    id: number;
    type: string;
    value: any;
    displayValue: string;
    required: boolean;
    unique: boolean;
    referenceId?: number;
}
