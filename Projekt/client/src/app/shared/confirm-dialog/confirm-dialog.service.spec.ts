import { TestBed } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialogModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

describe('ConfirmDialogService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [MatDialogModule],
            providers: [{ provide: TranslateService, useValue: {} }] })
    );

    it('should be created', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        expect(service).toBeTruthy();
    });
});
