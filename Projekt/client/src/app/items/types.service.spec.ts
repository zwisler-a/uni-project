import { TestBed } from '@angular/core/testing';

import { TypesService } from './types.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TypesService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    );

    it('should be created', () => {
        const service: TypesService = TestBed.get(TypesService);
        expect(service).toBeTruthy();
    });
});
