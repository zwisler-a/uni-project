export interface ApiTypeField {
    name: string;
    type: any;
    required: boolean;
    unique: boolean;
    referenceTypeId?: number;
}
