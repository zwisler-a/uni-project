import { Component, OnInit, Input } from '@angular/core';
import { DeterminedField } from '../../../models/field.interface';
import { FieldType } from '../../../models/field-type.enum';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-item-field-string',
    templateUrl: './item-field-string.component.html',
    styleUrls: ['./item-field-string.component.scss']
})
export class ItemFieldStringComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    name: string;

    constructor() {}

    ngOnInit() {}
}
