import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { ItemService } from './item.service';
import { MatSnackBarModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ItemStoreModule } from './item-store.module';
import { TypeStoreModule } from '../type-store/type-store.module';
/*
describe('ItemsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, ItemStoreModule, TypeStoreModule],
            providers: [{ provide: TranslateService, useValue: {} }]
        })
    );

    it('should be created', () => {
        const service: ItemService = TestBed.get(ItemService);
        expect(service).toBeTruthy();
    });

    it('should send a all object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            service.loadItems(1, 50).subscribe();
            const req = httpMock.expectOne(
                `${service.baseUrl}/?page=1&per_page=50`
            );
            expect(req.request.method).toBe('GET');
        }
    ));

    it('should send a type object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            service.loadItems(1, 50, 10).subscribe();
            const req = httpMock.expectOne(
                `${service.baseUrl}/10?page=1&per_page=50`
            );
            expect(req.request.method).toBe('GET');
        }
    ));

    it('should handle an error', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            service.loadItems(1, 50).subscribe(null, (err: ErrorEvent) => {
                expect(err).toBeTruthy();
            });
            const req = httpMock.expectOne(
                `${service.baseUrl}/?page=1&per_page=50`
            );
            req.error(new ErrorEvent('test'));
        }
    ));

    it('should send a create object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: [], typeId: 50, companyId: 2, id: 0 };
            service.createItem(data).subscribe();
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}`
            );
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toBe(data.fields);
        }
    ));

    it('should handle an error', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: [], typeId: 50, companyId: 2, id: 0 };
            service.createItem(data).subscribe(null, (err: ErrorEvent) => {
                expect(err).toBeTruthy();
            });
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}`
            );
            req.error(new ErrorEvent('test'));
        }
    ));

    it('should send a get object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: {}, companyId: 2, itemTypeId: 50, id: 25 };
            service.getItem(data.itemTypeId, data.id).subscribe();
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
            service
                .getItem(data.itemTypeId, data.id)
                .subscribe(null, (err: ErrorEvent) => {
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
            const data = { fields: [], companyId: 2, typeId: 50, id: 25 };
            service.updateItem(data).subscribe();
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}/${data.id}`
            );
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toBe(data.fields);
        }
    ));

    it('should handle an error', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: [], companyId: 2, typeId: 50, id: 25 };
            service.updateItem(data).subscribe(null, (err: ErrorEvent) => {
                expect(err).toBeTruthy();
            });
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}/${data.id}`
            );
            req.error(new ErrorEvent('test'));
        }
    ));

    it('should send a delete object request', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: {}, companyId: 2, typeId: 50, id: 25 };
            service.deleteItem(data.typeId, data.id).subscribe();
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}/${data.id}`
            );
            expect(req.request.method).toBe('DELETE');
        }
    ));

    it('should handle an error', inject(
        [HttpTestingController, ItemService],
        (httpMock: HttpTestingController, service: ItemService) => {
            const data = { fields: [], companyId: 2, typeId: 50, id: 25 };
            service
                .deleteItem(data.typeId, data.id)
                .subscribe(null, (err: ErrorEvent) => {
                    expect(err).toBeTruthy();
                });
            const req = httpMock.expectOne(
                `${service.baseUrl}/${data.typeId}/${data.id}`
            );
            req.error(new ErrorEvent('test'));
        }
    ));
});
*/
