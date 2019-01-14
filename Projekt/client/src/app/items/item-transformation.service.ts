import { Injectable } from '@angular/core';

import { ApiItemType } from './types/api/api-item-type.interface';
import { ApiItem } from './types/api/api-item.interface';
import { FieldType } from './types/field-type.enum';
import { Item } from './types/item.interface';
import { TypesService } from './types.service';

@Injectable({
    providedIn: 'root'
})
export class ItemTransformationService {
    constructor(private typesService: TypesService) {}

    /**
     * Transforms the items recieved from the backend in a form for easy use in the frontend
     * TODO: This might not be a very efficient way to convert. Investigate if time is there
     * @param items Items recieved from the API
     * @param types Types Recieved from the API
     */
    async transformItems(items: ApiItem[]): Promise<Item[]> {
        const promises = items.map(async item => {
            const itemType = await this.typesService.getType(item.typeId);
            if (!itemType) {
                throw new Error(
                    `Type ID ${item.typeId} of item ${item.id} not found!`
                );
            }
            return this.transformItem(item, itemType);
        });
        return await Promise.all(promises);
    }

    /**
     * Transforms a single item into a easily usable form for the frontend
     * @param item Item recieved from the API
     * @param itemType ItemType recieved from the API
     */
    transformItem(item: ApiItem, itemType: ApiItemType) {
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
                displayValue: this.getFieldDisplayValue(
                    apiField.value,
                    fieldType.type as FieldType
                )
            };
        });
        return uiItem;
    }

    /** Determines how a value should be displayed */
    private getFieldDisplayValue(value: any, type: FieldType) {
        switch (type) {
            case FieldType.boolean:
                return value ? 'Wahr' : 'Falsch';
            case FieldType.date:
                return new Date(value).toLocaleDateString('de-De');
            case FieldType.number:
                return value + '';
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
