import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DeterminedField } from '../../types/field.interface';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-date',
    templateUrl: './item-field-date.component.html',
    styleUrls: ['./item-field-date.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemFieldDateComponent implements OnInit {
    @Input()
    field: DeterminedField<string> = {
        name: '',
        type: FieldType.string,
        value: ''
    };

    @Input()
    edit: boolean;

    constructor() {}

    ngOnInit() {}
    test(input){
        console.log(input.control);
        return true;
    }
}
