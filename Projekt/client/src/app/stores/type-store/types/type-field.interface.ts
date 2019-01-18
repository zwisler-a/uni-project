export interface TypeField {
    name: string;
    id: number;
    type: any;
    required: boolean;
    unique: boolean;
    referenceId?: number;
}
