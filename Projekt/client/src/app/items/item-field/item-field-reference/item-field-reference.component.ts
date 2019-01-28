import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-reference',
    templateUrl: './item-field-reference.component.html',
    styleUrls: ['./item-field-reference.component.scss']
})
export class ItemFieldReferenceComponent implements OnInit {
    @Input()
    control: ItemFormControl;
    @Input()
    form: FormGroup;
    constructor() {}

    ngOnInit() {}
}
