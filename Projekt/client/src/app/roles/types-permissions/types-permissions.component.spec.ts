import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPermissionsComponent } from './types-permissions.component';
import { RolesModule } from '../roles.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TypesPermissionsComponent', () => {
    let component: TypesPermissionsComponent;
    let fixture: ComponentFixture<TypesPermissionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RolesModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                TranslateTestingModule.withTranslations({}),
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypesPermissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
