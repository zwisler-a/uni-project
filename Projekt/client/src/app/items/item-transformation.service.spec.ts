import { TestBed } from '@angular/core/testing';

import { ItemTransformationService } from './item-transformation.service';
import { ApiItem } from './types/api/api-item.interface';
import { ApiItemType } from './types/api/api-item-type.interface';
import { Item } from './types/item.interface';
import { FieldType } from './types/field-type.enum';

describe('ItemTransformationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ItemTransformationService = TestBed.get(
            ItemTransformationService
        );
        expect(service).toBeTruthy();
    });

    it('should transform an item properly', () => {
        const service: ItemTransformationService = TestBed.get(
            ItemTransformationService
        );
        const apiItem: ApiItem = { id: 0, typeId: 0, fields: { a: 1, b: '2' } };
        const apiItemType: ApiItemType = {
            id: 0,
            name: 'Test',
            fields: [
                { name: 'a', required: false, type: 'number', unique: false },
                { name: 'b', required: false, type: 'string', unique: false }
            ]
        };
        const result = service.transformItem(apiItem, apiItemType);
        const expected: Item = {
            id: 0,
            typeId: 0,
            fields: [
                { name: 'a', value: 1, type: FieldType.number },
                { name: 'b', value: '2', type: FieldType.string }
            ]
        };
        expect(result).toEqual(expected);
    });

    it('should transform items properly', () => {
        const service: ItemTransformationService = TestBed.get(
            ItemTransformationService
        );
        const apiItem: ApiItem[] = [
            { id: 0, typeId: 0, fields: { a: 1, b: '2' } }
        ];
        const apiItemType: ApiItemType[] = [
            {
                id: 0,
                name: 'Test',
                fields: [
                    {
                        name: 'a',
                        required: false,
                        type: 'number',
                        unique: false
                    },
                    {
                        name: 'b',
                        required: false,
                        type: 'string',
                        unique: false
                    }
                ]
            }
        ];
        const result = service.transformItems(apiItem, apiItemType);
        const expected: Item[] = [
            {
                id: 0,
                typeId: 0,
                fields: [
                    { name: 'a', value: 1, type: FieldType.number },
                    { name: 'b', value: '2', type: FieldType.string }
                ]
            }
        ];
        expect(result).toEqual(expected);
    });

    it('should retransform an item properly', () => {
        const service: ItemTransformationService = TestBed.get(
            ItemTransformationService
        );
        const item: Item = {
            id: 0,
            typeId: 0,
            fields: [
                { name: 'a', value: 1, type: FieldType.number },
                { name: 'b', value: '2', type: FieldType.string }
            ]
        };
        const result = service.retransformItem(item);
        const expected: ApiItem = {
            id: 0,
            typeId: 0,
            fields: { a: 1, b: '2' }
        };
        expect(result).toEqual(expected);
    });
});
