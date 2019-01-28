import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmbeddedItems } from 'src/app/models/api/embedded-items.interface';
import { Field } from 'src/app/models/field.interface';

import { ItemService } from '../_item-store/item.service';

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
    fields: Field[];

    @ViewChild(MatAutocompleteTrigger)
    autocompleteTrigger: MatAutocompleteTrigger;
    isSubmitting: boolean;
    controls: { [key: string]: FormControl };
    form: any;
    typeId = -1;

    constructor(
        private itemService: ItemService,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {}

    ngOnDestroy(): void {
        if (this.typeSub) {
            this.typeSub.unsubscribe();
        }
    }

    /** Sends a request to add the new item */
    submit() {
        this.isSubmitting = true;
        const item = Object.keys(this.controls).map(key => {
            const ctrl = this.controls[key];
            return { id: (ctrl as any).id as number, value: ctrl.value };
        });
        console.log(item);
        this.itemService.createItem(this.typeId, item).subscribe(
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
    typeChange(ev) {
        this.typeId = ev.type.id;
        this.createFormConrols(ev.type.fields);
        this.fields = ev.type.fields;
    }

    createFormConrols(fields: Field[]) {
        this.controls = {};
        fields.forEach(field => {
            const validators = [];
            this.controls[field.name] = new FormControl('', validators);
            (this.controls[field.name] as any).id = field.id;
        });
        this.form = new FormGroup(this.controls);
    }
}
