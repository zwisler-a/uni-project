export interface TypeField {
    name: string;
    id: number;
    type: any;
    required: boolean;
    unique: boolean;
    /** id of the field */
    typeId?: number;
    /** @depricated Type id its referencing */
    referenceId?: number;
    /** Field its referencing */
    reference?: TypeField;
}
