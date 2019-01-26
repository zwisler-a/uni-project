import { TestBed } from '@angular/core/testing';

import { TypesService } from './types.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TypesService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, TranslateTestingModule.withTranslations({})]
        })
    );

    it('should be created', () => {
        const service: TypesService = TestBed.get(TypesService);
        expect(service).toBeTruthy();
    });
});
