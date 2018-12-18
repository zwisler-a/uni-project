import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { EntityService } from './entity.service';

describe('EntityService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
  );

  it('should be created', () => {
    const service: EntityService = TestBed.get(EntityService);
    expect(service).toBeTruthy();
  });

  it('should send a all object request', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      service.allEntities(50).subscribe();
      const req = httpMock.expectOne(`${service.baseUrl}/50`);
      expect(req.request.method).toBe('GET');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      service.allEntities(50).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service.baseUrl}/50`);
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a create object request', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, entityTypeId: 50, companyId: 2 };
      service.createEntity(data).subscribe();
      const req = httpMock.expectOne(`${service.baseUrl}/${data.entityTypeId}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(data);
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, entityTypeId: 50, companyId: 2 };
      service.createEntity(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service.baseUrl}/${data.entityTypeId}`);
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a get object request', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.getEntity(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('GET');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.getEntity(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a modify object request', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.modifyEntity(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toBe(data);
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.modifyEntity(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a delete object request', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.deleteEntity(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('DELETE');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, EntityService],
    (httpMock: HttpTestingController, service: EntityService) => {
      const data = { fields: {}, companyId: 2, entityTypeId: 50, id: 25 };
      service.deleteEntity(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.entityTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));
});
