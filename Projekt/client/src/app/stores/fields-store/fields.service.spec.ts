import { TestBed } from '@angular/core/testing';

import { FieldsService } from './fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TypeStoreModule } from '../type-store/type-store.module';
import { ItemStoreModule } from '../item-store/item-store.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('FieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, TypeStoreModule, ItemStoreModule, TranslateTestingModule.withTranslations({})]
        })
    );

    it('should be created', () => {
        const service: FieldsService = TestBed.get(FieldsService);
        expect(service).toBeTruthy();
    });
});
