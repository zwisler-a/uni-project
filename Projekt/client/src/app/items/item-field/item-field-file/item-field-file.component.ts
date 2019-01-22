import { Component, OnInit, Input } from '@angular/core';
import { FileField, DeterminedField } from '../../../stores/item-store/types/field.interface';

@Component({
    selector: 'app-item-field-file',
    templateUrl: './item-field-file.component.html',
    styleUrls: ['./item-field-file.component.scss']
})
export class ItemFieldFileComponent implements OnInit {
    @Input()
    field: DeterminedField<FileField>;

    @Input()
    edit: boolean;
    constructor() {}

    ngOnInit() {}
}
