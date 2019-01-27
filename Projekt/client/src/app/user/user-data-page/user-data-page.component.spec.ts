import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataPageComponent } from './user-data-page.component';
import { AuthModule } from 'src/app/shell/auth/auth.module';
import { UserService } from '../_user-store/user.service';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog/confirm-dialog.module';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CompanyStoreModule } from 'src/app/company/_company-store/company-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
});
