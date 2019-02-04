import { FormControl, Validators } from '@angular/forms';
import { Field } from '../models/field.interface';
import { FieldType } from '../models/field-type.enum';
import { CustomValidators } from '../shared/custom-validators';
import { TypeField } from '../models/type-field.interface';

export class ItemFormControl extends FormControl {
    referenceType: number;
    referenceFieldId: number;
    reference: TypeField;

    constructor(
        value: any,
        public id: number,
        public type: string,
        public name: string,
        public required,
        public unique,
        ...args
    ) {
        super(value, ...args);
    }

    static fromField(field: Field | TypeField) {
        const validators = [];
        let value: any;
        if ('value' in field) {
            value = field.value;
        }
        if (field.type === FieldType.color) {
            validators.push(CustomValidators.isColor);
        }
        if (field.type === FieldType.boolean) {
            value = value || false;
        }
        if (field.required) {
            validators.push(Validators.required);
        }

        const ctrl = new ItemFormControl(value, field.id, field.type, field.name, field.required, field.unique, validators);

        if ('referenceValue' in field) {
            // field is of Type Field
            ctrl.referenceType = field.referenceTypeId;
            ctrl.reference = field.referenceValue;
            ctrl.referenceFieldId = field.referenceFieldId;
        } else if ('reference' in field) {
            // field is of Type TypeField
            ctrl.reference = field.reference;
            ctrl.referenceFieldId = field.reference.id;
            ctrl.referenceType = field.reference.typeId;
        }
        return ctrl;
    }
}
