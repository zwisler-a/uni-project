import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { RoleListComponent } from './role-list.component';
import { MatListModule } from '@angular/material';
import { RolesStoreModule } from '../_roles-store/roles-store.module';

describe('RoleListComponent', () => {
    let component: RoleListComponent;
    let fixture: ComponentFixture<RoleListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoleListComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes([]),
                MatListModule,
                RolesStoreModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
