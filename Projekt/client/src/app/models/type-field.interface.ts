export interface TypeField {
    name: string;
    id: number;
    type: any;
    required: boolean;
    unique: boolean;
    /** id of the field */
    typeId?: number;
    /** id of the field referenced*/
    referenceId?: number;
    /** Field its referencing */
    reference?: TypeField;
}
