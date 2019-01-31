import { FormGroup } from '@angular/forms';

export class ItemFormGroup extends FormGroup {
    referenceType;

    constructor(public typeId: number, controls: {}, ...args) {
        super(controls, ...args);
    }
}
