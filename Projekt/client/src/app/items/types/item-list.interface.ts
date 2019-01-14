import { Item } from './item.interface';
/** Data processed in the items-list.datasource for display reasons */
export interface ItemListData {
    /** current page index */
    page: number;
    /** items per page */
    perPage: number;
    /** total amount of items */
    length: number;
    /** if set it add to the paginator.length value */
    updateLength?: number;
    /** Data which is displayed */
    list: Item[];
}
