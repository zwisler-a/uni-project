import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/stores/type-store/types/type.interface';

import { ItemService } from '../../stores/item-store/item.service';
import { ApiItemsResponse } from '../../stores/item-store/types/api/api-items-response.interface';
import { Item } from '../../stores/item-store/types/item.interface';
import { TypesService } from '../../stores/type-store/types.service';

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
        private typesService: TypesService,
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
            (res: ApiItemsResponse) => {
                // redirect to details of the newly created item
                this.router.navigate(
                    [
                        '/items',
                        'view',
                        {
                            outlets: {
                                detail: [
                                    'details',
                                    res.items[0].typeId,
                                    res.items[0].id
                                ]
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
    typeChange(type: Type) {
        this.item.fields = type.fields.map(field => {
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
        this.item.typeId = type.id;
    }
}
