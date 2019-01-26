import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shell/auth/auth.service';
import { UserService } from '../_user-store/user.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
/**
 * UI for the user to edit and view his personal data
 */
@Component({
    selector: 'app-user-data-page',
    templateUrl: './user-data-page.component.html',
    styleUrls: ['./user-data-page.component.scss']
})
export class UserDataPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private confirmDialog: ConfirmDialogService
    ) {}

    ngOnInit() {}

    get username() {
        return this.authService.user ? this.authService.user.name : '';
    }

    get email() {
        return this.authService.user ? this.authService.user.email : '';
    }

    get companyId() {
        return 0;
    }

    /** Deletes the user which is logged in after confirm */
    deleteMe() {
        this.confirmDialog.open('user.deleteMe', true).subscribe(_ => {
            this.userService.deleteUser(this.authService.user.id).subscribe(_ => {
                this.authService.logout();
            });
        });
    }
}
