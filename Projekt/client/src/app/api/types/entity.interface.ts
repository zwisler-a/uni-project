import { CreatableEntity } from './creatable-entity.interface';

/** An entity, with all its properties (most likly send from backend) */
export interface Entity extends CreatableEntity {
    id: number;
    companyId: number;
}
