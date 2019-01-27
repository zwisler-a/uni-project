import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/models/item.interface';

import { ItemService } from '../_item-store/item.service';

@Injectable({
    providedIn: 'root'
})
export class FieldsService {
    readonly displayableColumns = this.itemService.items.pipe(
        map(items => {
            return this.transform(items);
        })
    );

    constructor(private itemService: ItemService) {}

    private transform(items: Item[]): string[] {
        const fields = new Set<string>();
        items.forEach(item => {
            item.fields.forEach(field => {
                fields.add(field.name);
            });
        });

        return Array.from(fields).sort();
    }
}
