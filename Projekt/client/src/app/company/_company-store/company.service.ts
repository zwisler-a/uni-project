import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from 'src/app/models/company.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    readonly baseUrl = environment.baseUrl + '/company';

    companies = new BehaviorSubject<Company[]>([]);

    constructor(private http: HttpClient) {}

    loadCompanies() {
        this.http.get<Company[]>(this.baseUrl).pipe(
            map(res => {
                this.companies.next(res);
                return this.companies;
            })
        );
    }

    getCompany(id: number): Observable<Company> {
        return this.companies.pipe(
            map(companies => {
                const foundCompany = companies.find(company => company.id + '' === id + '');
                if (!foundCompany) {
                    return { id: 0, name: 'Unknown Company!' };
                }
                return foundCompany;
            })
        );
    }
}
