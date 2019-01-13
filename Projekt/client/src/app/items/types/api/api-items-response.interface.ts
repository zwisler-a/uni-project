import { ApiItem } from './api-item.interface';
import { ApiItemType } from './api-item-type.interface';

export interface ApiItemsResponse {
    items: ApiItem[];
    types: ApiItemType[];
}
