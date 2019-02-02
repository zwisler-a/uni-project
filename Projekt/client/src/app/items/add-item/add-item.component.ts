import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmbeddedItems } from 'src/app/models/api/embedded-items.interface';
import { TypeField } from 'src/app/models/type-field.interface';
import { Type } from 'src/app/models/type.interface';
import { TypeSelectEvent } from 'src/app/shared/type-selector/type-selector-event.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';

import { ItemService } from '../_item-store/item.service';
import { ItemFormControl } from '../item-form-control';
import { ItemFormGroup } from '../item-form-group';
import { ItemFieldReferenceService } from '../item-field/item-field-reference/item-field-reference.service';

/**
 * UI to create an new Item
 */
@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
    typeSub: Subscription;
    @ViewChild(MatAutocompleteTrigger)
    autocompleteTrigger: MatAutocompleteTrigger;
    isSubmitting: boolean;
    form: ItemFormGroup = new ItemFormGroup(0, {});

    constructor(
        private itemService: ItemService,
        private typeService: TypesService,
        private location: Location,
        private refFieldService: ItemFieldReferenceService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        // restore state if its in a selection process
        if (this.refFieldService.isSelecting) {
            this.form = this.refFieldService.restoreState();
        }
    }

    ngOnDestroy(): void {
        if (this.typeSub) {
            this.typeSub.unsubscribe();
        }
    }

    /** Sends a request to add the new item */
    submit() {
        this.isSubmitting = true;
        const item = Object.keys(this.form.controls).map(key => {
            const ctrl = this.form.controls[key];
            return { id: (ctrl as any).id as number, value: ctrl.value };
        });
        this.itemService.createItem(this.form.typeId, item).subscribe(
            (res: EmbeddedItems) => {
                // redirect to details of the newly created item
                this.router.navigate(
                    [
                        '/items',
                        'view',
                        {
                            outlets: {
                                detail: ['details', res.items[0].typeId, res.items[0].id]
                            }
                        }
                    ],
                    {
                        relativeTo: this.activatedRoute
                    }
                );
                this.isSubmitting = false;
            },
            () => {
                this.isSubmitting = false;
            }
        );
    }

    /** Navigate back */
    back() {
        this.location.back();
    }

    /** Changes the type of the item and creates apropriate fields */
    typeChange(ev: TypeSelectEvent) {
        this.typeService.getType(ev.typeId).subscribe((type: Type) => {
            this.form.typeId = type.id;
            this.createFormConrols(ev.typeId, type.fields);
        });
    }

    get controlKeys() {
        return Object.keys(this.form.controls);
    }

    createFormConrols(typeId: number, fields: TypeField[]) {
        const controls = {};
        fields.forEach(field => {
            controls[field.name] = ItemFormControl.fromField(field);
        });
        this.form = new ItemFormGroup(typeId, controls);
    }
}
