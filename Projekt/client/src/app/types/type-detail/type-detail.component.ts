import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/models/type.interface';

import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { TypesService } from '../_type-store/types.service';

/** Display the detail of a type. Also allows editing/deleting. */
@Component({
    selector: 'app-type-detail',
    templateUrl: './type-detail.component.html',
    styleUrls: ['./type-detail.component.scss']
})
export class TypeDetailComponent implements OnInit {
    type: Type;
    edit = false;
    typeSub: Subscription;
    constructor(
        private activatedRoute: ActivatedRoute,
        private typesService: TypesService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.changeType(params.id);
        });
    }

    /**
     * Change the type displayed
     * @param id Id of the type
     */
    private changeType(id) {
        if (this.typeSub) {
            this.typeSub.unsubscribe();
        }
        this.typeSub = this.typesService.getType(id).subscribe(type => {
            // Make sure it is not the original object
            this.type = JSON.parse(JSON.stringify(type));
        });
    }

    /**
     * Removes the given field from the type
     * @param field Field to remove
     */
    removeField(field) {
        const fields = this.type.fields;
        fields.splice(fields.indexOf(field), 1);
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

    /** Cancel the editing */
    cancel() {
        this.edit = false;
        this.changeType(this.type.id);
    }

    /** Delete the type */
    delete() {
        // Open confirm first
        this.confirm.open('types.edit.confirmDelete', true).subscribe(() => {
            this.typeSub.unsubscribe();
            this.typesService.deleteType(this.type.id).subscribe(
                () => {
                    this.router.navigate(['/types', 'view']);
                },
                () => {
                    // resubscribe if deleting fails for some reason
                    this.changeType(this.type.id);
                }
            );
        });
    }

    /** Save changes to the item */
    save() {
        this.confirm.open('types.edit.confirmUpdate', true).subscribe(() => {
            this.typesService.updateType(this.type).subscribe(res => {
                this.router.navigate(['/types', 'view', { outlets: { detail: [res.id] } }]);
            });
        });
    }
}
