import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { TypesService } from '../types.service';
import { ApiItemType } from '../types/api-item-type.interface';

/** Display the detail of a type. Also allows editing/deleting. */
@Component({
    selector: 'app-type-detail',
    templateUrl: './type-detail.component.html',
    styleUrls: ['./type-detail.component.scss']
})
export class TypeDetailComponent implements OnInit {
    type: ApiItemType;
    edit = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private typesService: TypesService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.type = data.type;
        });
    }

    /** Add a field to the type */
    addField() {
        this.type.fields.push({
            name: '',
            id: 0,
            required: false,
            type: 'string',
            unique: false
        });
    }

    /** Delete the type */
    delete() {
        // Open confirm first
        this.confirm.open('types.edit.confirmDelete', true).subscribe(() => {
            this.typesService.deleteType(this.type.id).subscribe(() => {
                this.router.navigate(['/types']);
            });
        });
    }

    /** Save changes to the item */
    save() {
        this.typesService.updateType(this.type).subscribe(() => {
            this.router.navigate(['/types', this.type.id]);
        });
    }
}
