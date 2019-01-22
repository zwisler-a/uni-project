import { TestBed } from '@angular/core/testing';

import { ItemErrorService } from './item-error.service';
import { MatSnackBarModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ItemErrorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                TranslateTestingModule.withTranslations({})
            ]
        })
    );

    it('should be created', () => {
        const service: ItemErrorService = TestBed.get(ItemErrorService);
        expect(service).toBeTruthy();
    });
});
