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
            const itemType = types.find(type => item.typeId === type.id);
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
        uiItem.fields = Object.keys(fields).map(fieldKey => {
            const fieldType = itemType.fields.find(
                fieldTypeDef => fieldTypeDef.name === fieldKey
            );
            if (!fieldType) {
                throw new Error(
                    `No field with the name ${fieldKey} found in Type definition for ${
                        item.typeId
                    }`
                );
            }
            const fieldValue = fields[fieldKey];
            return {
                name: fieldKey,
                value: fieldValue,
                type: fieldType.type
            };
        });
        return uiItem;
    }
}
