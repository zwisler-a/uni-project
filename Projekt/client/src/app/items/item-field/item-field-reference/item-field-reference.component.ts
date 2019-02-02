import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemFormControl } from '../../item-form-control';
import { ItemFieldReferenceService } from './item-field-reference.service';

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
    constructor(private referencer: ItemFieldReferenceService, private router: Router) {}

    ngOnInit() {}

    select() {
        console.log(this.router.url);
        this.referencer.startSelectProcess(this.control, this.form, this.router.url);
    }

    openReference() {
        this.router.navigate(['/items', 'view', { outlets: { detail: ['details', this.control.referenceType, this.control.value] } }]);
    }
}
