/** Interface which only requires the bare minimum to create a new Enitity */
export interface CreatableEntity {
    entityTypeId: number;
    /** Object containing the specific attributes of the entity */
    fields: any;
}
