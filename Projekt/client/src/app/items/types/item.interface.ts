import { CreatableItem } from './creatable-item.interface';

/** An entity, with all its properties (most likly send from backend) */
export interface Item extends CreatableItem {
  id: number;
}
