import { Component, OnInit } from '@angular/core';
import { UserService } from '../_user-store/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    get users() {
        return this.userService.users;
    }

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.loadUsers().subscribe();
    }
}
