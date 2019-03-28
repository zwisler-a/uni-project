import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from 'src/app/shared/store/store.module';
import { environment } from 'src/environments/environment';

import { CompanyService } from './company.service';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({})
            ]
        })
    );

    it('should be created', () => {
        const service: CompanyService = TestBed.get(CompanyService);
        expect(service).toBeTruthy();
    });
    /*
    it('should load companies', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        service.loadCompanies().subscribe();
        const req = controller.expectOne(environment.baseUrl + '/companies');
        expect(req.request.method).toBe('GET');
    }));

    it('should update the store on load companies', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        service.loadCompanies().subscribe();
        const req = controller.expectOne(environment.baseUrl + '/companies');
        req.flush([{ test: 'test' }]);
        service.companies.subscribe(store => {
            expect(store.length).toBe(1);
        });
    }));

    it('load a company', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        const id = 10;
        service.getCompany(id).subscribe();
        const req = controller.expectOne(environment.baseUrl + '/companies' + '/' + id);
        expect(req.request.method).toBe('GET');
    }));

    it('load a company from store', inject([HttpTestingController], (controller: HttpTestingController) => {
        const service: CompanyService = TestBed.get(CompanyService);
        const id = 10;
        service.getCompany(id).subscribe();
        const req1 = controller.expectOne(environment.baseUrl + '/companies' + '/' + id);
        req1.flush({ id });
        service.getCompany(id).subscribe();
        controller.expectNone(environment.baseUrl + '/companies' + '/' + id);
    }));*/
});
