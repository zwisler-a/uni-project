import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { EMPTY, BehaviorSubject } from 'rxjs';
import { CompanyStoreModule } from 'src/app/company/_company-store/company-store.module';
import { User } from 'src/app/models/user.interface';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AuthModule } from 'src/app/shell/auth/auth.module';
import { AuthService } from 'src/app/shell/auth/auth.service';

import { UserStoreModule } from '../_user-store/user-store.module';
import { UserService } from '../_user-store/user.service';
import { UserDataPageComponent } from './user-data-page.component';

describe('UserDataPageComponent', () => {
    let component: UserDataPageComponent;
    let fixture: ComponentFixture<UserDataPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDataPageComponent],
            imports: [
                AuthModule,
                ConfirmDialogModule,
                NoopAnimationsModule,
                MatCardModule,
                MatIconModule,
                FormsModule,
                MatInputModule,
                CompanyStoreModule,
                FlexLayoutModule,
                MatSnackBarModule,
                UserStoreModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({})
            ],
            providers: [UserService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDataPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save changes', inject([HttpTestingController], (http: HttpTestingController) => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidHlwZSI6MSwiaWF0IjoxNTQ4NTgyNzg2LCJleHAiOjE1NTExNzQ3ODZ9' +
            '.zpfv43Z3c2XxTcD_oKqWdOq0GUfYaz6k5cAWGLO2WWM';

        expect(component).toBeTruthy();
        localStorage.setItem(AuthService.LOCALSTROAGE_KEY, token);
        component.save();
        const req = http.match({ method: 'PATCH' });
        expect(req.length).toBeTruthy();
        req[0].flush({ id: 0, name: 'test', email: '' } as User);
        const req2 = http.match({ method: 'PATCH' });
        expect(req2.length).toBeTruthy();
        req2[0].flush({
            short: token
        });
    }));

    it('should delete me', inject([HttpTestingController], (http: HttpTestingController) => {
        expect(component).toBeTruthy();
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        (component as any).authService._user = { id: 0 };
        (component as any).confirmDialog = {
            open: () => {
                return new BehaviorSubject(true);
            }
        };
        component.deleteMe();
    }));
});
