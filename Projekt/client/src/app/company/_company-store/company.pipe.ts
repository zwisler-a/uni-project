import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

import { CompanyService } from './company.service';

@Pipe({
    name: 'company'
})
export class CompanyPipe implements PipeTransform {
    constructor(private companyService: CompanyService) {}

    transform(companyId: any, args?: any): any {
        return this.companyService.getCompany(companyId).pipe(map(company => company.name));
    }
}
