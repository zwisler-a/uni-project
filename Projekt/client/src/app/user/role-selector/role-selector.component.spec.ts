import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectorComponent } from './role-selector.component';
import { UserModule } from '../user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoleSelectorComponent', () => {
    let component: RoleSelectorComponent;
    let fixture: ComponentFixture<RoleSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                UserModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({}),
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
