import { TypeField } from './type-field.interface';

export interface Type {
    id: number;
    name: string;
    fields: TypeField[];
    globals?: TypeField[];
}
