import { ApiItemType } from './api-item-type.interface';
import { ApiItem } from './api-item.interface';

/** Might be not needed */
export interface ApiItemResponse {
    item: ApiItem;
    type: ApiItemType;
}
