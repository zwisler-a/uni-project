import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';

import { AddCompanyComponent } from './add-company.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompanyStoreModule } from '../_company-store/company-store.module';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCompanyComponent', () => {
    let component: AddCompanyComponent;
    let fixture: ComponentFixture<AddCompanyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddCompanyComponent],
            imports: [
                FormsModule,
                MatInputModule,
                NoopAnimationsModule,
                MatToolbarModule,
                MatButtonModule,
                FlexLayoutModule,
                CompanyStoreModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({})
            ],
            providers: [{ provide: Location, useValue: {} }]
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
