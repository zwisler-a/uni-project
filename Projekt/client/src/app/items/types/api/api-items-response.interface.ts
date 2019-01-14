import { ApiItem } from './api-item.interface';
import { ApiItemType } from './api-item-type.interface';
/** Response EmbeddedItem in swagger.yml */
export interface ApiItemsResponse {
    items: ApiItem[];
    types: ApiItemType[];
}
