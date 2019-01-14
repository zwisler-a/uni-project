import { Item } from './item.interface';

export interface ItemListData {
    page: number;
    perPage: number;
    length: number;
    updateLength?: number;
    list: Item[];
}
