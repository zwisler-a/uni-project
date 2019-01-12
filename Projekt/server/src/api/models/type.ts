export interface Type {
    id: number;
    name: string;
    fields: TypeField[];
}

export interface TypeField {
    id: number;
    name: string;
    type: string;
    required: boolean;
    unique: boolean;
    referenceTypeId?: number;
}

export enum TypeFieldType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    file = 'file',
    color = 'color',
    date = 'date',
    reference = 'reference'
}
