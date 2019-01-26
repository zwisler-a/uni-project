import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Item } from '../../models/item.interface';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ItemService } from '../_item-store/item.service';

/**
 * Displays and allows editing of the fields of an Item
 */
@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
    /** Item to display */
    item: Item;
    /** If the item should be editable right now (should be changed via editFields()) */
    edit: boolean;
    itemSub: Subscription;
    constructor(
        private acitvatedRoute: ActivatedRoute,
        private confirmService: ConfirmDialogService,
        private itemService: ItemService,
        private location: Location
    ) {}

    ngOnInit() {
        // Look out for route parameter change
        this.acitvatedRoute.params.subscribe(params => {
            this.changeItem(params['typeId'], params['id']);
        });
    }

    ngOnDestroy(): void {
        if (this.itemSub) {
            this.itemSub.unsubscribe();
        }
    }

    /** Stop watching old item if there is one and get the specified one */
    private changeItem(typeId, itemId) {
        if (this.itemSub) {
            this.itemSub.unsubscribe();
        }
        // TODO check if the old item is dirty
        this.itemSub = this.itemService
            .getItem(typeId, itemId)
            .subscribe(item => {
                if (!this.edit) {
                    this.item = item;
                }
            });
    }

    /** Send a request to the backend to delete the displayed item. Navigates back on success. */
    delete() {
        this.confirmService.open('items.confirm.delete', true).subscribe(() => {
            this.itemService
                .deleteItem(this.item.typeId, this.item.id)
                .subscribe(res => {
                    this.location.back();
                });
        });
    }

    /** Sets the fields editable or not. Resets the Item if edit is set to false */
    editFields(edit = true) {
        this.edit = edit;
        if (!edit) {
            this.changeItem(this.item.typeId, this.item.id);
        }
    }

    /** Sends a request to update the item */
    submit() {
        this.itemService.updateItem(this.item).subscribe(res => {
            this.edit = false;
        });
    }

    /** Navigate back */
    back() {
        this.location.back();
    }
}
