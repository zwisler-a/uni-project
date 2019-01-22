import { TestBed } from '@angular/core/testing';

/*
describe('ItemTransformationService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: []
        })
    );

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
        const apiItem: ApiItem = {
            id: 0,
            typeId: 0,
            fields: [{ id: 0, value: 1 }, { id: 1, value: 'a' }]
        };
        const apiItemType: ApiItemType = {
            id: 0,
            name: 'Test',
            fields: [
                {
                    name: 'a',
                    required: false,
                    type: 'number',
                    unique: false,
                    id: 0
                },
                {
                    name: 'b',
                    required: false,
                    type: 'string',
                    unique: false,
                    id: 1
                }
            ]
        };
        const result = service.transformItem(apiItem, apiItemType);
        const expected: Item = {
            id: 0,
            typeId: 0,
            fields: [
                {
                    name: 'a',
                    value: 1,
                    type: FieldType.number,
                    id: 0,
                    unique: false,
                    required: false,
                    displayValue: '1'
                },
                {
                    name: 'b',
                    value: 'a',
                    type: FieldType.string,
                    id: 1,
                    unique: false,
                    required: false,
                    displayValue: 'a'
                }
            ]
        };
        expect(result).toEqual(expected);
    });

    it('should transform items properly', () => {
        const service: ItemTransformationService = TestBed.get(
            ItemTransformationService
        );
        const apiItem: ApiItem[] = [
            {
                id: 0,
                typeId: 0,
                fields: [{ id: 0, value: 1 }, { id: 1, value: '2' }]
            }
        ];
        const apiItemType: ApiItemType = {
            id: 0,
            name: 'Test',
            fields: [
                {
                    name: 'a',
                    required: false,
                    type: 'number',
                    unique: false,
                    id: 0
                },
                {
                    name: 'b',
                    required: false,
                    type: 'string',
                    unique: false,
                    id: 1
                }
            ]
        };
        const result = service.transformItems(apiItem, [apiItemType]);
        const expected: Item[] = [
            {
                id: 0,
                typeId: 0,
                fields: [
                    {
                        name: 'a',
                        value: 1,
                        type: FieldType.number,
                        displayValue: '1',
                        id: 0,
                        required: false,
                        unique: false
                    },
                    {
                        name: 'b',
                        value: '2',
                        type: FieldType.string,
                        displayValue: '2',
                        id: 1,
                        required: false,
                        unique: false
                    }
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
                {
                    name: 'a',
                    value: 1,
                    type: FieldType.number,
                    displayValue: '',
                    unique: false,
                    required: false,
                    id: 0
                },
                {
                    name: 'b',
                    value: '2',
                    type: FieldType.string,
                    displayValue: '',
                    unique: false,
                    required: false,
                    id: 1
                }
            ]
        };
        const result = service.retransformItem(item);
        const expected: ApiItem = {
            id: 0,
            typeId: 0,
            fields: [{ value: 1, id: 0 }, { value: '2', id: 1 }]
        };
        expect(result).toEqual(expected);
    });
});

*/
