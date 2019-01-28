import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-item-field-reference',
    templateUrl: './item-field-reference.component.html',
    styleUrls: ['./item-field-reference.component.scss']
})
export class ItemFieldReferenceComponent implements OnInit {
    @Input()
    name: string;

    @Input()
    form: FormGroup;
    constructor() {}

    ngOnInit() {}
}
