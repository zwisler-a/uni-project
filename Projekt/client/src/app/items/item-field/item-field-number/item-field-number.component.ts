import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-number',
    templateUrl: './item-field-number.component.html',
    styleUrls: ['./item-field-number.component.scss']
})
export class ItemFieldNumberComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    control: ItemFormControl;

    constructor() {}

    ngOnInit() {}
}
