/** An item in the form we get it fron the backend */
export interface ApiItem {
    id: number;
    typeId: number;
    fields: { id: number; value: any }[];
}
