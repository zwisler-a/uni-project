import { Component, Host, OnInit, Optional } from '@angular/core';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    constructor(@Optional() @Host() private defaultPage: DefaultPageComponent) {}

    ngOnInit() {
        if (!this.defaultPage) {
            return;
        }
        this.defaultPage.title = 'company.title';
    }
}
