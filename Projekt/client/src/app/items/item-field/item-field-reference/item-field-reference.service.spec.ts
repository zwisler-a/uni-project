import { TestBed } from '@angular/core/testing';

import { ItemFieldReferenceService } from './item-field-reference.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatSnackBarModule } from '@angular/material';

describe('ItemFieldReferenceService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), TranslateTestingModule.withTranslations({}), MatSnackBarModule]
        })
    );

    it('should be created', () => {
        const service: ItemFieldReferenceService = TestBed.get(ItemFieldReferenceService);
        expect(service).toBeTruthy();
    });
});
