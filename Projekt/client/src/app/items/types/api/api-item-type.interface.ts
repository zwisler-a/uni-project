import { ApiTypeField } from './api-type-field.interface';

export interface ApiItemType {
    id: number;
    name: string;
    fields: ApiTypeField[];
}
