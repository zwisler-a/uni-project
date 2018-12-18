import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { ItemService } from './entity.service';

describe('EntityService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    );

    it('should be created', () => {
        const service: ItemService = TestBed.get(ItemService);
        expect(service).toBeTruthy();
    });

    it('should send a create object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: {}, entityTypeId: 50 };
            service.createEntity(data).subscribe();
            const req = httpMock.expectOne(service.apiUrls.create);
            expect(req.request.body).toBe(data);
        }
    ));

    it('should handle an error', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: {}, entityTypeId: 50 };
            service.createEntity(data).subscribe(null, (err: ErrorEvent) => {
                expect(err).toBeTruthy();
            });
            const req = httpMock.expectOne(service.apiUrls.create);
            req.error(new ErrorEvent('test'));
        }
    ));
});
