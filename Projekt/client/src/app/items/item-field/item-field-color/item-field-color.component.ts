import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-item-field-color',
    templateUrl: './item-field-color.component.html',
    styleUrls: ['./item-field-color.component.scss']
})
export class ItemFieldColorComponent implements OnInit {
    @Input()
    name: string;

    @Input()
    form: FormGroup;

    constructor() {}

    ngOnInit() {}
}
