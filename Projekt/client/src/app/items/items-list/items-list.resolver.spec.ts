import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { ItemStoreModule } from '../_item-store/item-store.module';
import { ItemsListResolver } from './items-list.resolver';

describe('ItemsResolver', () => {
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
});
