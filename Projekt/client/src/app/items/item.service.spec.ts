import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ItemService } from './item.service';

describe('EntityService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
  );

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });

  it('should send a all object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      service.getItems(1, 50).subscribe();
      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('GET');
    }
  ));

  it('should send a type object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      service.getItems(1, 50, 10).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/10`
      );
      expect(req.request.method).toBe('GET');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      service.getItems(1, 50).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service.baseUrl}`);
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a create object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, itemTypeId: 50, companyId: 2 };
      service.createItem(data).subscribe();
      const req = httpMock.expectOne(`${service.baseUrl}/${data.itemTypeId}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(data);
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, itemTypeId: 50, companyId: 2 };
      service.createItem(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(`${service.baseUrl}/${data.itemTypeId}`);
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a get object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.getItem(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('GET');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.getItem(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a modify object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.updateItem(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toBe(data);
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.updateItem(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));

  it('should send a delete object request', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.deleteItem(data).subscribe();
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      expect(req.request.method).toBe('DELETE');
    }
  ));

  it('should handle an error', inject(
    [HttpTestingController, ItemService],
    (httpMock: HttpTestingController, service: ItemService) => {
      const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
      service.deleteItem(data).subscribe(null, (err: ErrorEvent) => {
        expect(err).toBeTruthy();
      });
      const req = httpMock.expectOne(
        `${service.baseUrl}/${data.itemTypeId}/${data.id}`
      );
      req.error(new ErrorEvent('test'));
    }
  ));
});
