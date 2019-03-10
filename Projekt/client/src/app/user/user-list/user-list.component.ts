import { Component, Host, OnInit, Optional } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { fadeInOut } from 'src/app/shared/animations';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { UserService } from '../_user-store/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: [fadeInOut]
})
export class UserListComponent implements OnInit {
    users: Observable<User[]>;

    constructor(
        private userService: UserService,
        @Optional() @Host() private defaultPage: DefaultPageComponent,
        private router: Router
    ) {}

    ngOnInit() {
        if (!this.defaultPage) {
            return;
        }
        this.defaultPage.title = 'user.title';
        this.users = combineLatest(this.userService.users, this.defaultPage.search, (users, query) => {
            return users.filter(user => user.name.includes(query));
        });

        this.defaultPage.actions.next([
            {
                click: () => {
                    this.router.navigate(['/user', 'view', { outlets: { detail: ['add'] } }]);
                },
                icon: 'add',
                tooltip: ''
            }
        ]);
    }
}
