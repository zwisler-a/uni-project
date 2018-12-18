import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

<<<<<<< HEAD
import { ItemService } from './entity.service';
=======
import { EntityService } from './entity.service';
>>>>>>> ef46ddf... feat: createEntity

describe('EntityService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    );

    it('should be created', () => {
<<<<<<< HEAD
        const service: ItemService = TestBed.get(ItemService);
=======
        const service: EntityService = TestBed.get(EntityService);
>>>>>>> ef46ddf... feat: createEntity
        expect(service).toBeTruthy();
    });

    it('should send a create object request', inject(
<<<<<<< HEAD
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
=======
        [HttpTestingController, EntityService],
        (httpMock: HttpTestingController, service: EntityService) => {
>>>>>>> ef46ddf... feat: createEntity
            const data = { fields: {}, entityTypeId: 50 };
            service.createEntity(data).subscribe();
            const req = httpMock.expectOne(service.apiUrls.create);
            expect(req.request.body).toBe(data);
        }
    ));

    it('should handle an error', inject(
<<<<<<< HEAD
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
=======
        [HttpTestingController, EntityService],
        (httpMock: HttpTestingController, service: EntityService) => {
>>>>>>> ef46ddf... feat: createEntity
            const data = { fields: {}, entityTypeId: 50 };
            service.createEntity(data).subscribe(null, (err: ErrorEvent) => {
                expect(err).toBeTruthy();
            });
            const req = httpMock.expectOne(service.apiUrls.create);
            req.error(new ErrorEvent('test'));
        }
    ));
});
