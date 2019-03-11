import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Field } from 'src/app/models/field.interface';
import { TypeField } from 'src/app/models/type-field.interface';

import { ApiItem, ApiItemField } from '../../models/api/api-item.interface';
import { EmbeddedItems } from '../../models/api/embedded-items.interface';
import { FieldType } from '../../models/field-type.enum';
import { Item } from '../../models/item.interface';
import { Type } from '../../models/type.interface';

/**
 * Pipe to translate items from ApiItem to UIItems and via versa.
 */
@Pipe({ name: 'toItem' })
export class ItemPipe implements PipeTransform {
    constructor(private sanatizer: DomSanitizer) {}

    toItem() {
        return map((data: EmbeddedItems) => {
            return this.transform(data.items, data.types);
        });
    }

    /**
     * Transforms the items recieved from the backend in a form for easy use in the frontend
     * TODO: This might not be a very efficient way to convert. Investigate if time is there
     * @param items Items recieved from the API
     * @param types Types Recieved from the API
     */
    transform(items: ApiItem[], types: Type[]): Item[] {
        const transformedItems = items.map(item => {
            const type = types.find(searchType => searchType.id + '' === item.typeId + '');
            if (!type) {
                throw new Error(
                    `The type with the ID ${item.typeId} is missing. But the Item with the id ${item.id} is of that type!`
                );
            }
            return this.transformItem(item, type);
        });
        return transformedItems;
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
        uiItem.fields = item.fields.map(apiField => {
            let fieldType;
            if (apiField.global) {
                fieldType = itemType.globals.find(fieldTypeDef => fieldTypeDef.id === apiField.id);
            } else {
                fieldType = itemType.fields.find(fieldTypeDef => fieldTypeDef.id === apiField.id);
            }
            if (!fieldType) {
                throw new Error(`The Type with the ID ${itemType.id} does not contain a field with the ID ${apiField.id}.`);
            }
            return {
                name: fieldType.name,
                value: apiField.value,
                id: apiField.id,
                required: fieldType.required,
                unique: fieldType.unique,
                type: fieldType.type,
                referenceValue: apiField.reference,
                global: apiField.global,
                referenceFieldId: fieldType.reference ? fieldType.reference.id : null,
                referenceTypeId: fieldType.reference ? fieldType.reference.typeId : null,
                displayValue: this.getFieldDisplayValue(apiField, fieldType)
            } as Field;
        });
        return uiItem;
    }

    /** Determines how a value should be displayed */
    private getFieldDisplayValue(field: ApiItemField, fieldType: TypeField) {
        switch (fieldType.type) {
            case FieldType.boolean:
                return field.value ? '<i class="material-icons">check</i>' : '<i class="material-icons">close</i>';
            case FieldType.date:
                return new Date(field.value).toLocaleDateString('de-De');
            case FieldType.number:
                return field.value + '';
            case FieldType.file:
                return field.value && field.value.length ? field.value[field.value.length - 1].name : '';
            case FieldType.color:
                // sanatize color beforehand and than bypass the display value
                const svalue = this.sanatizer.sanitize(SecurityContext.HTML, field.value);
                return this.sanatizer.bypassSecurityTrustHtml(
                    `${svalue} <span style="display: inline-block;width: 10px;height: 10px;background:${svalue}"></span>`
                );
            case FieldType.reference:
                return (
                    '<span class="table-cell-reference"><i class="material-icons">link</i> ' +
                    this.getFieldDisplayValue({ value: field.reference, id: 0, global: false }, fieldType.reference) +
                    '</span>'
                );
            default:
                return field.value;
        }
    }
}
