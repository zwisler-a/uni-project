import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CompanyService } from './company.service';

/** Translates a companyId to the actual comapny name. Return an observable. */
@Pipe({
    name: 'company'
})
export class CompanyPipe implements PipeTransform {
    constructor(private companyService: CompanyService) {}

    transform(companyId: any, args?: any): Observable<string> {
        if (companyId === '' || companyId === 0 || !companyId) {
            return of('');
        }
        return this.companyService.getCompany(companyId).pipe(map(company => company.name));
    }
}
