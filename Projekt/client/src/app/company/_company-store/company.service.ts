import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Company } from 'src/app/models/company.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    readonly baseUrl = environment.baseUrl + '/companies';

    companies = new BehaviorSubject<Company[]>([]);

    constructor(private http: HttpClient) {}

    loadCompanies() {
        return this.http.get<Company[]>(this.baseUrl).pipe(
            map(res => {
                this.companies.next(res);
                return this.companies;
            })
        );
    }

    getCompany(id: number): Observable<Company> {
        return this.companies.pipe(
            flatMap(companies => {
                const foundCompany = companies.find(company => company.id + '' === id + '');
                if (!foundCompany) {
                    return this.loadCompany(id);
                } else {
                    return of(foundCompany);
                }
            })
        );
    }

    loadCompany(id: number) {
        return this.http.get<Company>(this.baseUrl + '/' + id).pipe(
            map(res => {
                const store = this.companies.getValue();
                store.push(res);
                this.companies.next(store);
                return res;
            })
        );
    }
}
