import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { NavigationGroup } from './navigation.interface';

describe('NavigationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NavigationService = TestBed.get(NavigationService);
        expect(service).toBeTruthy();
    });

    it('store the naviagtion data', () => {
        const service: NavigationService = TestBed.get(NavigationService);
        const testModel: NavigationGroup[] = [
            {
                title: 'title',
                items: [
                    { icon: 'icon', label: 'label', route: ['string', 123] }
                ]
            }
        ];
        service.navigationModel = testModel;
        expect(service.navigationModel).toBe(testModel);
    });
});
