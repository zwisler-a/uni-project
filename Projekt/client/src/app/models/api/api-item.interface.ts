/** An item in the form we get it fron the backend */
export interface ApiItem {
    id: number;
    typeId: number;
    fields: ApiItemField[];
}
export interface ApiItemField {
    id: number;
    value: any;
    reference?: any;
}
