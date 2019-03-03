import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { CompanyStoreModule } from 'src/app/company/_company-store/company-store.module';
import { StoreModule } from 'src/app/shared/store/store.module';

import { AuthModule } from '../auth/auth.module';
import { CompanySelectorComponent } from './company-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('CompanySelectorComponent', () => {
    let component: CompanySelectorComponent;
    let fixture: ComponentFixture<CompanySelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompanySelectorComponent],
            imports: [
                MatMenuModule,
                AuthModule,
                StoreModule,
                MatIconModule,
                CompanyStoreModule,
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
