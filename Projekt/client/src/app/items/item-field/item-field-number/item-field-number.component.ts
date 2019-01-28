import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-item-field-number',
    templateUrl: './item-field-number.component.html',
    styleUrls: ['./item-field-number.component.scss']
})
export class ItemFieldNumberComponent implements OnInit {
    @Input()
    name: string;

    @Input()
    form: FormGroup;
    constructor() {}

    ngOnInit() {}
}
