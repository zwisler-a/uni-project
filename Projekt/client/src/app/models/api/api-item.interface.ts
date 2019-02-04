/** An item in the form we get it fron the backend */
export interface ApiItem {
    id: number;
    typeId: number;
    fields: ApiItemField[];
}
/** Value information of a Field */
export interface ApiItemField {
    id: number;
    value: any;
    global: boolean;
    reference?: any;
}
