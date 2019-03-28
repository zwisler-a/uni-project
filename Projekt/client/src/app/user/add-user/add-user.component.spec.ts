import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { CompanyStoreModule } from 'src/app/company/_company-store/company-store.module';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { AddUserComponent } from './add-user.component';
import { UserModule } from '../user.module';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddUserComponent', () => {
    let component: AddUserComponent;
    let fixture: ComponentFixture<AddUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                UserModule,
                NoopAnimationsModule,
                MatIconModule,
                MatInputModule,
                RouterTestingModule.withRoutes([]),
                MatButtonModule,
                TranslateTestingModule.withTranslations({}),
                CompanyStoreModule,
                MatSnackBarModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                NoopAnimationsModule,
                TypeStoreModule,
                HttpClientTestingModule
            ],
            providers: [{ provide: Location, useValue: { path: () => '' } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
