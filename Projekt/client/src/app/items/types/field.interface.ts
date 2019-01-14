import { FieldType } from './field-type.enum';
/** A property of an item */
export interface Field {
    name: string;
    id: number;
    type: FieldType;
    value: string | number | LinkField | FileField;
    displayValue: string;
    required: boolean;
    unique: boolean;
}
/** A property of an item in a better usable state for ts */
export interface DeterminedField<T> {
    name: string;
    type: FieldType;
    value: T;
    required?: boolean;
    unique?: boolean;
}
/** @deprecated */
export interface LinkField {
    name: string;
    ref: string;
}
/** @deprecated */
export interface FileField {
    name: string;
    ref: string;
    history: string[];
}
