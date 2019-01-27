import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { ItemStoreModule } from '../_item-store/item-store.module';
import { ItemsListResolver } from './items-list.resolver';

describe('FieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                TypeStoreModule,
                ItemStoreModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({})
            ],
            providers: [ItemsListResolver]
        })
    );

    it('should be created', () => {
        const service: ItemsListResolver = TestBed.get(ItemsListResolver);
        expect(service).toBeTruthy();
    });

    it('should redirect if no types', inject([HttpTestingController], (http: HttpTestingController) => {
        const service: ItemsListResolver = TestBed.get(ItemsListResolver);
        expect(service).toBeTruthy();

        const answer = service.resolve({ params: {} } as any, null);
        answer.subscribe();
        const req = http.expectOne('/api/types');
        req.flush([]);
    }));

    it('should redirect if no pagination is given', inject([HttpTestingController], (http: HttpTestingController) => {
        const service: ItemsListResolver = TestBed.get(ItemsListResolver);
        expect(service).toBeTruthy();

        const answer = service.resolve({ params: { page: undefined, perPage: undefined } } as any, null);
        answer.subscribe();
        const req = http.expectOne('/api/types');
        req.flush([{}]);
    }));

    it('should load items if all ok', inject([HttpTestingController], (http: HttpTestingController) => {
        const service: ItemsListResolver = TestBed.get(ItemsListResolver);
        expect(service).toBeTruthy();

        const answer = service.resolve({ params: { page: 0, perPage: 25 } } as any, null);
        answer.subscribe();
        const req = http.expectOne('/api/types');
        const req2 = http.match('/api/items/*');
        req.flush([{}]);
    }));
});
