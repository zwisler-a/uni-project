import { Component, OnInit, Optional, Host } from '@angular/core';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    constructor(@Optional() @Host() private defaultPage: DefaultPageComponent) {}

    ngOnInit() {
        if (!this.defaultPage) {
            return;
        }
        this.defaultPage.title = 'roles.title';
    }
}
