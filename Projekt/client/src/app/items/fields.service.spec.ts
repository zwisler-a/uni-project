import { TestBed } from '@angular/core/testing';

import { FieldsService } from './fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FieldsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    );

    it('should be created', () => {
        const service: FieldsService = TestBed.get(FieldsService);
        expect(service).toBeTruthy();
    });
});
