export interface ApiTypeField {
    name: string;
    id: number;
    type: any;
    required: boolean;
    unique: boolean;
    referenceTypeId?: number;
}
