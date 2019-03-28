import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';

import { AddCompanyComponent } from './add-company.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompanyStoreModule } from '../_company-store/company-store.module';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddCompanyComponent', () => {
    let component: AddCompanyComponent;
    let fixture: ComponentFixture<AddCompanyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddCompanyComponent],
            imports: [
                ReactiveFormsModule,
                MatInputModule,
                NoopAnimationsModule,
                MatToolbarModule,
                MatButtonModule,
                FlexLayoutModule,
                MatSnackBarModule,
                RouterTestingModule.withRoutes([]),
                CompanyStoreModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({})
            ],
            providers: [{ provide: Location, useValue: { path: () => {} } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCompanyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
