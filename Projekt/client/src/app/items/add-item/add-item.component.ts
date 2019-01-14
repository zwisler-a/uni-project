import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemTransformationService } from '../item-transformation.service';
import { ItemService } from '../item.service';
import { TypesService } from '../types.service';
import { ApiItemType } from '../types/api/api-item-type.interface';
import { ApiItemsResponse } from '../types/api/api-items-response.interface';
import { FieldType } from '../types/field-type.enum';
import { Item } from '../types/item.interface';

/**
 * UI to create an new Item
 */
@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    /** Item beeing edited */
    item: Item = { id: -1, fields: [], typeId: -1 };
    /** Possible types the item can be */
    itemTypes: { name: string; id: number }[] = [];

    @ViewChild(MatAutocompleteTrigger)
    autocompleteTrigger: MatAutocompleteTrigger;
    isSubmitting: boolean;

    constructor(
        private itemTransform: ItemTransformationService,
        private itemService: ItemService,
        private location: Location,
        private router: Router,
        private typesService: TypesService,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {}

    ngOnInit() {
        // load all possible types
        this.typesService.getTypes(true).then((res: any) => {
            this.itemTypes = res;
        });
    }

    /** Sends a request to add the new item */
    submit() {
        this.isSubmitting = true;
        const apiItem = this.itemTransform.retransformItem(this.item);
        this.itemService.createItem(apiItem).subscribe(
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

    /** Displayable value of an type */
    toItemTypeName(itemType: ApiItemType) {
        return itemType.name;
    }

    /** Changes the type of the item and creates apropriate fields */
    typeChange(id: number) {
        this.http.get('api/types/' + id).subscribe((type: ApiItemType) => {
            this.item.fields = type.fields.map(field => {
                return {
                    name: field.name,
                    type: field.type as FieldType,
                    value: undefined,
                    displayValue: '',
                    unique: field.unique,
                    required: field.required,
                    id: field.id
                };
            });
            this.item.typeId = type.id;
        });
    }

    /** Try fining an item type by name and select it if found */
    selectTypeByName(ev) {
        const type = this.itemTypes.find(
            option => option.name === ev.target.value
        );
        if (type) {
            this.autocompleteTrigger.closePanel();
            this.typeChange(type.id);
        }
    }
}
