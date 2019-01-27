import { ApiItem } from './api-item.interface';
import { Type } from 'src/app/models/type.interface';
/** Response EmbeddedItem in swagger.yml */
export interface EmbeddedItems {
    items: ApiItem[];
    types: Type[];
}
