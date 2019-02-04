import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company.interface';
import { StoreFactoryService } from 'src/app/shared/store/store-factory.service';
import { Store } from 'src/app/shared/store/store.class';
import { environment } from 'src/environments/environment.prod';

/**
 * Handles all company related backend communication
 */
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private _store: Store<Company>;

    get companies() {
        return this._store.store;
    }

    constructor(private storeFactory: StoreFactoryService) {
        this._store = this.storeFactory.create<Company>({
            baseUrl: environment.baseUrl + '/companies',
            errorKeyBase: 'company.'
        });
    }

    /** Fetch the list of companies */
    loadCompanies() {
        return this._store.load();
    }

    /** Tries to get a company. First tries store fallback to backend request */
    getCompany(id: number): Observable<Company> {
        return this._store.byId(id);
    }

    /**
     * Creates a new company
     * @param name Name of the company
     */
    createCompany(name: string) {
        return this._store.create({ name: name, id: 0 });
    }

    /**
     * Creates a new company
     * @param id Id of the company
     */
    deleteCompany(id: number): any {
        return this._store.delete({ id });
    }
}
