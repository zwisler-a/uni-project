import { FieldType } from './field-type.enum';

export interface Field {
    name: string;
    id: number;
    type: FieldType;
    value: string | number | LinkField | FileField;
}

export interface DeterminedField<T> {
    name: string;
    type: FieldType;
    value: T;
}

export interface LinkField {
    name: string;
    ref: string;
}

export interface FileField {
    name: string;
    ref: string;
    history: string[];
}
