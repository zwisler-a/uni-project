import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CompanyService } from './company.service';

/** Makes sure the company are loaded before resolving */
@Injectable({ providedIn: 'root' })
export class CompanyResolver implements Resolve<any> {
    constructor(private companyService: CompanyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.companyService.loadCompanies();
    }
}
