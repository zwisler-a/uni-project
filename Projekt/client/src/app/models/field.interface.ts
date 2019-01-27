import { FieldType } from './field-type.enum';
/** A property of an item */
export interface Field {
    name: string;
    id: number;
    type: string;
    value: string | number;
    displayValue: string;
    required: boolean;
    unique: boolean;
    referenceId?: number;
}
/** A property of an item in a better usable state for ts */
export interface DeterminedField<T> {
    name: string;
    type: string;
    value: T;
    required?: boolean;
    unique?: boolean;
    referenceId?: string;
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