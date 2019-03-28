import { TestBed } from '@angular/core/testing';

import { FieldsService } from './fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';
import { ItemStoreModule } from '../_item-store/item-store.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TypeStoreModule,
                ItemStoreModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({})
            ]
        })
    );

    it('should be created', () => {
        const service: FieldsService = TestBed.get(FieldsService);
        expect(service).toBeTruthy();
    });
});
