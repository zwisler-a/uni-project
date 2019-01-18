import { Injectable } from '@angular/core';
import { of, zip, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ItemService } from '../item-store/item.service';
import { TypesService } from '../type-store/types.service';

@Injectable({
    providedIn: 'root'
})
export class FieldsService {
    readonly displayableColumns = this.itemService.rawItems.pipe(
        switchMap(items => {
            return this.transform(items);
        }),
        map(types => {
            const flatTypes = [];
            types.forEach(type => {
                flatTypes.push(...type);
            });
            return flatTypes;
        })
    );

    constructor(
        private itemService: ItemService,
        private typeServce: TypesService
    ) {}

    private transform(items): Observable<string[][]> {
        let ids: number[] = items.map(item => {
            return item.typeId + '';
        });

        const unique = a => Array.from<number>(new Set(a));

        ids = unique(ids);

        const observables = ids.map(id => {
            return this.typeServce.getType(id).pipe(
                map(type => {
                    if (!type.fields) {
                        return [];
                    }
                    return type.fields.map(field => field.name);
                })
            );
        });

        if (!observables.length) {
            return of([]);
        }

        return zip(...observables);
    }
}
