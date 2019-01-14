import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { Item } from '../types/item.interface';
import { ItemService } from '../item.service';
import { Location } from '@angular/common';
import { ItemTransformationService } from '../item-transformation.service';
import { ApiItemType } from '../types/api/api-item-type.interface';
import {
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger
} from '@angular/material';
import { FieldType } from '../types/field-type.enum';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiItemsResponse } from '../types/api/api-items-response.interface';
import { TypesService } from '../types.service';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    item: Item = { id: -1, fields: [], typeId: -1 };
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
        this.typesService.getTypes(true).then((res: any) => {
            this.itemTypes = res;
        });
    }

    /** Sends a request to update the item */
    submit() {
        this.isSubmitting = true;
        const apiItem = this.itemTransform.retransformItem(this.item);
        this.itemService.createItem(apiItem).subscribe(
            (res: ApiItemsResponse) => {
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

    toItemTypeName(itemType: ApiItemType) {
        return itemType.name;
    }

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
