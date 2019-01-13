import { Injectable } from '@angular/core';
import { Item } from './types/item.interface';
import { ApiItemType } from './types/api/api-item-type.interface';
import { ApiItem } from './types/api/api-item.interface';

@Injectable({
    providedIn: 'root'
})
export class ItemTransformationService {
    constructor() {}

    /**
     * Transforms the items recieved from the backend in a form for easy use in the frontend
     * TODO: This might not be a very efficient way to convert. Investigate if time is there
     * @param items Items recieved from the API
     * @param types Types Recieved from the API
     */
    transformItems(items: ApiItem[], types: ApiItemType[]): Item[] {
        return items.map(item => {
            const itemType = types.find(
                type => item.typeId + '' === type.id + ''
            );
            if (!itemType) {
                throw new Error(
                    `Type ID ${item.typeId} of item ${item.id} not found!`
                );
            }
            return this.transformItem(item, itemType);
        });
    }

    /**
     * Transforms a single item into a easily usable form for the frontend
     * @param item Item recieved from the API
     * @param itemType ItemType recieved from the API
     */
    transformItem(item: ApiItem, itemType: ApiItemType) {
        const fields = item.fields;
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
                type: fieldType.type
            };
        });
        return uiItem;
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
