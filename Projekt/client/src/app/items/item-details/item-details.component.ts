import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../types/item.interface';
import { Location } from '@angular/common';
import { ItemService } from '../item.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ItemTransformationService } from '../item-transformation.service';

/**
 * Displays and allows editing of the fields of an Item
 */
@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
    /** Item to display */
    item: Item;
    /** If the item should be editable right now (should be changed via editFields()) */
    edit: boolean;
    constructor(
        private acitvatedRoute: ActivatedRoute,
        private confirmService: ConfirmDialogService,
        private itemTransform: ItemTransformationService,
        private itemService: ItemService,
        private location: Location,
        private router: Router
    ) {}

    ngOnInit() {
        this.acitvatedRoute.data.subscribe(data => {
            this.item = data.item;
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
            this.router.navigate(['.'], { relativeTo: this.acitvatedRoute });
        }
    }

    /** Sends a request to update the item */
    submit() {
        const apiItem = this.itemTransform.retransformItem(this.item);
        this.itemService.updateItem(apiItem).subscribe(res => {
            this.router.navigate(['.'], { relativeTo: this.acitvatedRoute });
            this.edit = false;
        });
    }

    /** Navigate back */
    back() {
        this.location.back();
    }
}
