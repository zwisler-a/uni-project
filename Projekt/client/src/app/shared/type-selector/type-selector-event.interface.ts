import { TypeField } from 'src/app/models/type-field.interface';
import { Type } from 'src/app/models/type.interface';

export interface TypeSelectEvent {
    typeId: number;
    fieldId?: number;
}
