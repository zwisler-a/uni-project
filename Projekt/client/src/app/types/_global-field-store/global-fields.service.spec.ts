import { TestBed } from '@angular/core/testing';

import { GlobalFieldsService } from './global-fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { StoreModule } from 'src/app/shared/store/store.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('GlobalFieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule, TranslateTestingModule.withTranslations({})]
        })
    );

    it('should be created', () => {
        const service: GlobalFieldsService = TestBed.get(GlobalFieldsService);
        expect(service).toBeTruthy();
    });
});
