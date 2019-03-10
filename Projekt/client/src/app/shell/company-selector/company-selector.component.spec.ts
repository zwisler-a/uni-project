import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { CompanyStoreModule } from 'src/app/company/_company-store/company-store.module';
import { StoreModule } from 'src/app/shared/store/store.module';

import { AuthModule } from '../auth/auth.module';
import { CompanySelectorComponent } from './company-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompanySelectorComponent', () => {
    let component: CompanySelectorComponent;
    let fixture: ComponentFixture<CompanySelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanySelectorComponent],
            imports: [
                MatMenuModule,
                AuthModule,
                NoopAnimationsModule,
                StoreModule,
                MatIconModule,
                CompanyStoreModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({}),
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanySelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', inject([HttpTestingController], (ctrl: HttpTestingController) => {
        const reqs = ctrl.match('*');
        reqs.forEach(req => {
            req.flush([]);
        });
        expect(component).toBeTruthy();
    }));
});
