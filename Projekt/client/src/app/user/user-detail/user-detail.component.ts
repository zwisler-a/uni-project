import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_user-store/user.service';
import { User } from 'src/app/shell/auth/user.interface';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user: User;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectUser(params['id']);
        });
    }
    selectUser(id: string): any {
        this.userService.getUser(id).subscribe(user => {
            this.user = user;
        });
    }

    deleteUser() {
        this.confirm.open('user.delete').subscribe(() => {
            this.userService.deleteUser(this.user.id).subscribe(res => {
                this.router.navigate(['/users/view']);
            });
        });
    }
}
