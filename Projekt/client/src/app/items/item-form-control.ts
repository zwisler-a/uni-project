import { FormControl, Validators } from '@angular/forms';
import { Field } from '../models/field.interface';
import { FieldType } from '../models/field-type.enum';
import { CustomValidators } from '../shared/custom-validators';

export class ItemFormControl extends FormControl {
    constructor(value: any, public id: number, public type: string, public name: string, ...args) {
        super(value, ...args);
    }

    static fromField(field: Field) {
        const validators = [];
        let value: any = field.value;
        if (field.type === FieldType.color) {
            validators.push(CustomValidators.isColor);
        }
        if (field.type === FieldType.boolean) {
            value = field.value || false;
        }
        if (field.required) {
            validators.push(Validators.required);
        }

        return new ItemFormControl(value, field.id, field.type, field.name, validators);
    }
}
