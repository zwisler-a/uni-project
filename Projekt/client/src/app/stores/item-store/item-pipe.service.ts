import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TypesService } from '../type-store/types.service';
import { ApiItem } from './types/api/api-item.interface';
import { FieldType } from './types/field-type.enum';
import { Item } from './types/item.interface';
import { Type } from '../type-store/types/type.interface';

@Pipe({ name: 'toItem' })
export class ItemPipe implements PipeTransform {
    constructor(
        private typesService: TypesService,
        private sanatizer: DomSanitizer
    ) {}

    toItem() {
        return switchMap((items: Item[]) => {
            return this.transform(items);
        });
    }

    /**
     * Transforms the items recieved from the backend in a form for easy use in the frontend
     * TODO: This might not be a very efficient way to convert. Investigate if time is there
     * @param items Items recieved from the API
     * @param types Types Recieved from the API
     */
    transform(items: ApiItem[]): Observable<Item[]> {
        const observableItems = items.map(item => {
            return this.typesService.getType(item.typeId).pipe(
                map(type => {
                    if (!type) {
                        throw new Error(
                            `Type ID ${item.typeId} of item ${
                                item.id
                            } not found!`
                        );
                    }
                    return this.transformItem(item, type);
                })
            );
        });
        if (!observableItems.length) {
            return of([]);
        }
        return zip(...observableItems);
    }

    /**
     * Transforms a single item into a easily usable form for the frontend
     * @param item Item recieved from the API
     * @param itemType ItemType recieved from the API
     */
    private transformItem(item: ApiItem, itemType: Type): Item {
        const uiItem: Item = {
            id: item.id,
            typeId: item.typeId,
            fields: []
        };
        // TODO refac
        uiItem.fields = item.fields.map(apiField => {
            const fieldType = itemType.fields.find(
                fieldTypeDef => fieldTypeDef.id === apiField.id
            );
            if (!fieldType) {
                throw new Error(
                    `No field with the id ${
                        apiField.id
                    } found in Type definition for ${item.typeId}`
                );
            }
            return {
                name: fieldType.name,
                value: apiField.value,
                id: apiField.id,
                required: fieldType.required,
                unique: fieldType.unique,
                type: fieldType.type,
                referenceId: fieldType.referenceId,
                displayValue: this.getFieldDisplayValue(
                    apiField.value,
                    fieldType.type
                )
            };
        });
        return uiItem;
    }

    /** Determines how a value should be displayed */
    private getFieldDisplayValue(value: any, type: string) {
        switch (type) {
            case FieldType.boolean:
                return value
                    ? '<i class="material-icons">check</i>'
                    : '<i class="material-icons">close</i>';
            case FieldType.date:
                return new Date(value).toLocaleDateString('de-De');
            case FieldType.number:
                return value + '';
            case FieldType.color:
                // sanatize color beforehand and than bypass the display value
                const svalue = this.sanatizer.sanitize(
                    SecurityContext.HTML,
                    value
                );
                return this.sanatizer.bypassSecurityTrustHtml(
                    `${svalue} <span style="display: inline-block;width: 10px;height: 10px;background:${svalue}"></span>`
                );
            case FieldType.reference:
                return (
                    '<span class="table-cell-reference"><i class="material-icons">link</i> ' +
                    value +
                    '</span>'
                );
            default:
                return value;
        }
    }

    /** Converts an item to an item usable by the backend */
    retransformItem(item: Item): ApiItem {
        const apiItemFields: { id: number; value: any }[] = [];
        item.fields.forEach(field => {
            if (field.value !== undefined) {
                apiItemFields.push({ id: field.id, value: field.value });
            }
        });
        return {
            fields: apiItemFields,
            id: item.id,
            typeId: item.typeId
        };
    }
}
