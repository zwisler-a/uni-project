import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ItemFieldReferenceService } from './item-field-reference.service';
import { ItemFormControl } from '../../item-form-control';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemFieldReferenceService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({}),
                NoopAnimationsModule,
                MatSnackBarModule
            ]
        })
    );

    it('should be created', () => {
        const service: ItemFieldReferenceService = TestBed.get(ItemFieldReferenceService);
        expect(service).toBeTruthy();
    });

    it('should store a state', () => {
        const service: ItemFieldReferenceService = TestBed.get(ItemFieldReferenceService);
        const state = { a: 'a' };
        service.startSelectProcess({} as ItemFormControl, state, '');
        expect((service.restoreState() as any).a).toBe(state.a);
    });

});
