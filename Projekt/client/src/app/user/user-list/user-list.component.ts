import { Component, Host, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

import { UserService } from '../_user-store/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: Observable<User[]>;

    constructor(private userService: UserService, @Host() private defaultPage: DefaultPageComponent) {}

    ngOnInit() {
        this.userService.loadUsers().subscribe();
        this.users = combineLatest(this.userService.users, this.defaultPage.search, (users, query) => {
            return users.filter(user => user.name.includes(query));
        });
    }
}
