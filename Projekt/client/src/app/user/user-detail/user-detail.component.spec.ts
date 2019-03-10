import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModule } from '../user.module';
import { UserDetailComponent } from './user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog/confirm-dialog.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Location } from '@angular/common';

describe('UserDetailComponent', () => {
    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                UserModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([]),
                ConfirmDialogModule,
                TranslateTestingModule.withTranslations({})
            ],
            declarations: [],
            providers: [{ provide: Location, useValue: { path: () => '' } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
