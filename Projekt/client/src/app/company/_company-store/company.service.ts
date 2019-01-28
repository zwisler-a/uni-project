import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, OperatorFunction } from 'rxjs';
import { flatMap, map, tap, catchError } from 'rxjs/operators';
import { Company } from 'src/app/models/company.interface';
import { environment } from 'src/environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

/**
 * Handles all company related backend communication
 * TODO: this is redundant code
 */
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    readonly baseUrl = environment.baseUrl + '/companies';

    companies = new BehaviorSubject<Company[]>([]);

    constructor(private http: HttpClient, private translate: TranslateService, private snackbar: MatSnackBar) {}

    /** Fetch the lest of companies */
    loadCompanies() {
        return this.http.get<Company[]>(this.baseUrl).pipe(
            map(res => {
                this.companies.next(res);
                return this.companies;
            }),
            this.catch('company.error.get')
        );
    }

    /** Tries to get a company. First tries store fallback to backend request */
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

    /**
     * Creates a new company
     * @param name Name of the company
     */
    createCompany(name: string) {
        return this.http.post(this.baseUrl, { name }).pipe(
            tap((res: Company) => {
                const store = this.companies.getValue();
                store.push(res);
                this.companies.next(store);
            }),
            this.catch('company.error.create')
        );
    }

    /**
     * Creates a new company
     * @param id Id of the company
     */
    deleteCompany(id: number): any {
        return this.http.delete(this.baseUrl + `/` + id).pipe(
            tap(res => {
                let store = this.companies.getValue();
                store = store.filter(company => company.id + '' !== id + '');
                this.companies.next(store);
            }),
            this.catch('company.error.delete')
        );
    }

    /**
     * Fetch a single company for the backend
     * @param id company to fetch
     */
    private loadCompany(id: number) {
        return this.http.get<Company>(this.baseUrl + '/' + id).pipe(
            map(res => {
                const store = this.companies.getValue();
                store.push(res);
                this.companies.next(store);
                return res;
            }),
            this.catch('company.error.get')
        );
    }

    /**
     * Shows a snackbar
     * @param text Text to display (gets translated)
     */
    private catch<T>(text: string): OperatorFunction<T, T> {
        return catchError(res => {
            const translated = this.translate.instant(text);
            this.snackbar.open(translated);
            return throwError(res);
        });
    }
}
