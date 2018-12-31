/** Interface which only requires the bare minimum to create a new Enitity */
export interface CreatableItem {
  itemTypeId: number;
  companyId: number;
  /** Object containing the specific attributes of the entity */
  fields: any;
}
