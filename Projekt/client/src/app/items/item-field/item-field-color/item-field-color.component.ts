import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ItemFormControl } from '../../item-form-control';

@Component({
    selector: 'app-item-field-color',
    templateUrl: './item-field-color.component.html',
    styleUrls: ['./item-field-color.component.scss']
})
export class ItemFieldColorComponent implements OnInit {
    @Input()
    control: ItemFormControl;
    @Input()
    form: FormGroup;

    constructor() {}

    ngOnInit() {}
}
