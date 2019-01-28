import { TestBed, inject } from '@angular/core/testing';

import { CompanyService } from './company.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('CompanyService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, TranslateTestingModule.withTranslations({})]
        })
    );

    it('should be created', () => {
        const service: CompanyService = TestBed.get(CompanyService);
        expect(service).toBeTruthy();
    });

    it('should load companies', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        service.loadCompanies().subscribe();
        const req = controller.expectOne(service.baseUrl);
        expect(req.request.method).toBe('GET');
    }));

    it('should update the store on load companies', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        service.loadCompanies().subscribe();
        const req = controller.expectOne(service.baseUrl);
        req.flush([{ test: 'test' }]);
        service.companies.subscribe(store => {
            expect(store.length).toBe(1);
        });
    }));

    it('load a company', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        const id = 10;
        service.getCompany(id).subscribe();
        const req = controller.expectOne(service.baseUrl + '/' + id);
        expect(req.request.method).toBe('GET');
    }));

    it('load a company from store', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        const id = 10;
        service.getCompany(id).subscribe();
        const req1 = controller.expectOne(service.baseUrl + '/' + id);
        req1.flush({ id });
        service.getCompany(id).subscribe();
        controller.expectNone(service.baseUrl + '/' + id);
    }));
});
