import { Field } from './field.interface';

/** An entity, with all its properties used in the frontend */
export interface Item {
    id: number;
    typeId: number;
    fields: Field[];
}
