import { Field } from './field.interface';

/** An entity, with all its properties (most likly send from backend) */
export interface Item {
    id: number;
    itemTypeId: number;
    fields: Field[];
}
