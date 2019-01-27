import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { Company } from 'src/app/models/company.interface';
import { environment } from 'src/environments/environment.prod';

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

    createCompany(name: string) {
        return this.http.post(this.baseUrl, { name }).pipe(
            tap((res: Company) => {
                const store = this.companies.getValue();
                store.push(res);
                this.companies.next(store);
            })
        );
    }

    deleteCompany(id: number): any {
        return this.http.delete(this.baseUrl + `/` + id).pipe(
            tap(res => {
                let store = this.companies.getValue();
                store = store.filter(company => company.id + '' !== id + '');
                this.companies.next(store);
            })
        );
    }

    private loadCompany(id: number) {
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
