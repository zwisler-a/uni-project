import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Item } from 'src/app/models/item.interface';

import { ItemService } from '../_item-store/item.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  readonly displayableColumns = this.itemService.items.pipe(
    map(items => {
      return this.transform(items);
    })
  );

  _displayColumns = new BehaviorSubject<string[]>([]);
  readonly displayColumns = this._displayColumns.pipe(
    map(cols => {
      const fields = new Set<string>();
      cols.forEach(col => fields.add(col));
      return Array.from(fields);
    })
  );

  constructor(private itemService: ItemService) {
    this.displayableColumns.subscribe(cols => {
      this._displayColumns.next(cols);
    });
  }

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
