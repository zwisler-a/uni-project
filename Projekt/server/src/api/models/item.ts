export interface Item {
    typeId: number;
    id: number;
    fields: Field[];
}

export interface Field {
    id: number;
    value: any;
}