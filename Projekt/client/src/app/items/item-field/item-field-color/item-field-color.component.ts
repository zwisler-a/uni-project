import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DeterminedField } from '../../types/field.interface';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { FieldType } from '../../types/field-type.enum';

@Component({
    selector: 'app-item-field-color',
    templateUrl: './item-field-color.component.html',
    styleUrls: ['./item-field-color.component.scss']
})
export class ItemFieldColorComponent implements OnInit {
    @Input()
    field: DeterminedField<string> = {
        name: '',
        type: FieldType.color,
        value: ''
    };
    _edit: boolean;
    @Input()
    set edit(val) {
        val ? this.control.enable() : this.control.disable();
        this._edit = val;
    }

    get edit() {
        return this._edit;
    }

    control = new FormControl('', this.isColor);
    constructor() {}

    ngOnInit() {
        this.control = new FormControl('', this.isColor);
        this.edit ? this.control.enable() : this.control.disable();
        // Hijack the setValue method. There is probably a better way to do it
        // but i cant think of it right now
        const org = this.control.setValue;
        this.control.setValue = (val, opts?) => {
            this.field.value = val;
            org.call(this.control, val, opts);
        };
    }

    isColor(control: AbstractControl): { [key: string]: any } | null {
        const isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(control.value);
        return isOk ? null : { 'not-a-color': true };
    }
}
