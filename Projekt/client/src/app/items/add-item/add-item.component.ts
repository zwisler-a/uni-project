import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmbeddedItems } from 'src/app/models/api/embedded-items.interface';

import { Item } from '../../models/item.interface';
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
    /** Item beeing edited */
    item: Item = { id: -1, fields: [], typeId: -1 };
    typeSub: Subscription;

    @ViewChild(MatAutocompleteTrigger)
    autocompleteTrigger: MatAutocompleteTrigger;
    isSubmitting: boolean;

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
        this.itemService.createItem(this.item).subscribe(
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
        this.item.fields = ev.type.fields.map(field => {
            return {
                name: field.name,
                type: field.type,
                value: undefined,
                displayValue: '',
                unique: field.unique,
                required: field.required,
                id: field.id
            };
        });
        this.item.typeId = ev.type.id;
    }
}