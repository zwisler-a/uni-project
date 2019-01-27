import { TestBed } from '@angular/core/testing';

import { GlobalFieldsService } from './global-fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';

describe('GlobalFieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule]
        })
    );

    it('should be created', () => {
        const service: GlobalFieldsService = TestBed.get(GlobalFieldsService);
        expect(service).toBeTruthy();
    });
});
