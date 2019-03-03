import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule
} from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NavigateBackModule } from 'src/app/shared/navigate-back/navigate-back.module';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { RolesStoreModule } from '../_roles-store/roles-store.module';
import { RoleDetailComponent } from './role-detail.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RoleDetailComponent', () => {
    let component: RoleDetailComponent;
    let fixture: ComponentFixture<RoleDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoleDetailComponent],
            imports: [
                CommonModule,
                NoopAnimationsModule,
                NavigateBackModule,
                MatIconModule,
                MatCheckboxModule,
                MatTableModule,
                MatSortModule,
                MatToolbarModule,
                MatInputModule,
                MatSnackBarModule,
                MatButtonModule,
                TypeStoreModule,
                FormsModule,
                HttpClientTestingModule,
                RolesStoreModule,
                TranslateTestingModule.withTranslations({})
            ],
            providers: [{ provide: Location, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
