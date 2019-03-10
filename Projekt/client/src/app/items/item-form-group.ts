import { FormGroup } from '@angular/forms';

export class ItemFormGroup extends FormGroup {

    constructor(public typeId: number,public itemId: number, controls: {}, ...args) {
        super(controls, ...args);
    }
}
