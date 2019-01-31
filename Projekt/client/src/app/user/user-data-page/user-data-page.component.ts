import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { fadeIn } from 'src/app/shared/animations';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AuthService } from 'src/app/shell/auth/auth.service';

import { UserService } from '../_user-store/user.service';

/**
 * UI for the user to edit and view his personal data
 */
@Component({
    selector: 'app-user-data-page',
    templateUrl: './user-data-page.component.html',
    styleUrls: ['./user-data-page.component.scss'],
    animations: [fadeIn]
})
export class UserDataPageComponent implements OnInit {
    changePasswordForm: FormGroup;
    changeUserForm: FormGroup;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private confirmDialog: ConfirmDialogService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.setup();
        merge(this.userService.users, this.authService.authChange).subscribe(this.setup.bind(this));
    }

    private setup() {
        const currentPassword = new FormControl('', [Validators.required]);
        const newPassword = new FormControl('', [Validators.required, this.passwordValidator()]);
        const repeatPassword = new FormControl('', [Validators.required, this.matchValidator(newPassword)]);
        this.changePasswordForm = new FormGroup({
            currentPassword,
            newPassword,
            repeatPassword
        });
        const user = this.authService.user;
        this.changeUserForm = this.fb.group({
            name: [user ? user.name : '', Validators.required],
            email: [user ? user.email : '', Validators.email]
        });
    }

    private passwordValidator(): ValidatorFn {
        return (control: FormControl) => {
            const pw: string = control.value;
            const checks = {
                length: !(pw.length > 8),
                uppercase: !/[A-Z]/.test(pw),
                lowercase: !/[a-z]/.test(pw),
                number: !/[0-9]/.test(pw),
                specialChar: !/[!@#§$%^&*(),.?":{}|<>]/.test(pw)
            };
            if (checks.length || checks.uppercase || checks.lowercase || checks.number || checks.specialChar) {
                return { invalidPassword: checks };
            } else {
                return null;
            }
        };
    }

    private matchValidator(matchControl: FormControl): ValidatorFn {
        return (control: FormControl) => {
            if (control.value === matchControl.value) {
                return null;
            } else {
                return { missmatch: true };
            }
        };
    }

    save() {
        const updateUserInfo = this.changeUserForm.dirty && this.changeUserForm.valid;
        const authUser = this.authService.user;
        const user: User = {
            id: authUser ? authUser.id : 0,
            name: updateUserInfo ? this.changeUserForm.get('name').value : authUser ? authUser.name : '',
            email: updateUserInfo ? this.changeUserForm.get('email').value : authUser ? authUser.email : ''
        };
        if (this.changePasswordForm.valid && this.changePasswordForm.dirty) {
            user.password = this.changePasswordForm.get('newPassword').value;
        }
        this.userService.updateUser(user).subscribe(() => {
            this.authService.reauthenticate().subscribe(res => {
                const text = this.translate.instant(updateUserInfo ? 'user.updateInfoUpdated' : 'user.passwordUpdated');
                this.snackBar.open(text, null, { duration: 2000, horizontalPosition: 'end', panelClass: 'success' });
            });
        });
    }

    get companyId() {
        const user = this.authService.user;
        return user ? user.companyId : '';
    }

    /** Deletes the user which is logged in after confirm */
    deleteMe() {
        this.confirmDialog.open('user.deleteMe', true).subscribe(_ => {
            this.userService.deleteUser(this.authService.user.id).subscribe(() => {
                this.authService.logout();
            });
        });
    }
}
