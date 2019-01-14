import { ApiTypeField } from './api-type-field.interface';
/** A type in the form we get it from the backend */
export interface ApiItemType {
    id: number;
    name: string;
    fields: ApiTypeField[];
}
