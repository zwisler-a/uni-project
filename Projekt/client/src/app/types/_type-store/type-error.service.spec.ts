import { TestBed } from '@angular/core/testing';

import { TypeErrorService } from './type-error.service';
import { MatSnackBarModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TypeErrorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [MatSnackBarModule, TranslateTestingModule.withTranslations({})] })
    );

    it('should be created', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        expect(service).toBeTruthy();
    });
});
