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

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    item: Item = { id: -1, fields: [], typeId: -1 };
    itemTypes: ApiItemType[] = [
        {
            fields: [
                { name: 'a', required: false, type: 'string', unique: false }
            ],
            id: 0,
            name: 'Test'
        },
        { fields: [], id: 1, name: 'Laptop' },
        { fields: [], id: 2, name: 'Buch' }
    ];

    @ViewChild(MatAutocompleteTrigger)
    autocompleteTrigger: MatAutocompleteTrigger;

    constructor(
        private itemTransform: ItemTransformationService,
        private itemService: ItemService,
        private location: Location
    ) {}

    ngOnInit() {
    }

    /** Sends a request to update the item */
    submit() {
        const apiItem = this.itemTransform.retransformItem(this.item);
        this.itemService.createItem(apiItem).subscribe(res => {});
    }

    /** Navigate back */
    back() {
        this.location.back();
    }

    toItemTypeName(itemType: ApiItemType) {
        return itemType.name;
    }

    typeChange(type: ApiItemType) {
        this.item.fields = type.fields.map(field => {
            return {
                name: field.name,
                type: field.type as FieldType,
                value: undefined
            };
        });
        this.item.typeId = type.id;
    }

    selectTypeByName(ev) {
        const type = this.itemTypes.find(
            option => option.name === ev.target.value
        );
        if (type) {
            this.autocompleteTrigger.closePanel();
            this.typeChange(type);
        }
    }
}
