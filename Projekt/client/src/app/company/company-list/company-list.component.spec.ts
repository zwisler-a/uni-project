import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { CompanyStoreModule } from '../_company-store/company-store.module';
import { CompanyListComponent } from './company-list.component';

describe('CompanyListComponent', () => {
    let component: CompanyListComponent;
    let fixture: ComponentFixture<CompanyListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyListComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes([]),
                MatListModule,
                CompanyStoreModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
