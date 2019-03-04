import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { StoreModule } from 'src/app/shared/store/store.module';

import { RolesModule } from '../roles.module';
import { AddRoleComponent } from './add-role.component';

describe('AddRoleComponent', () => {
    let component: AddRoleComponent;
    let fixture: ComponentFixture<AddRoleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RolesModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({}),
                StoreModule,
                NoopAnimationsModule
            ],
            providers: [{ provide: Location, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
