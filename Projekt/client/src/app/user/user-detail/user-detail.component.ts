import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

import { UserService } from '../_user-store/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
    user: User;

    userSub: Subscription;
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
    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
    selectUser(id: number): any {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
        this.userSub = this.userService.getUser(id).subscribe((user: User) => {
            this.user = user;
        });
    }

    deleteUser() {
        this.confirm.open('user.delete', true).subscribe(() => {
            this.userSub.unsubscribe();
            this.userService.deleteUser(this.user.id).subscribe(res => {
                this.router.navigate(['/user/view']);
            });
        });
    }

    updateUser() {
        const user = Object.assign({}, this.user);
        user.roles = user.roles.map(role => role.id);
        this.userService.updateUser(user).subscribe();
    }
}
