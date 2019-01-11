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
