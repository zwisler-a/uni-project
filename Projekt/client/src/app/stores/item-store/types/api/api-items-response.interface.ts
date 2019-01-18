import { ApiItem } from './api-item.interface';
import { Type } from 'src/app/stores/type-store/types/type.interface';
/** Response EmbeddedItem in swagger.yml */
export interface ApiItemsResponse {
    items: ApiItem[];
    types: Type[];
}
