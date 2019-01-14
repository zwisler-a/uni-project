import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { environment } from '../../environments/environment';
import { ApiItemType } from './types/api/api-item-type.interface';

@Injectable({
    providedIn: 'root'
})
export class TypesService implements Resolve<void> {
    baseUrl = `${environment.baseUrl}/types`;
    store: ApiItemType[];
    constructor(private http: HttpClient) {}

    resolve() {
        this.store = undefined;
    }

    async getTypes(reload = false) {
        if (!this.store || reload) {
            const res = await this.http
                .get<ApiItemType[]>(this.baseUrl)
                .toPromise();
            this.store = res;
        }
        return this.store;
    }

    async getType(id: number): Promise<ApiItemType> {
        const types = await this.getTypes();
        const storedType = types.find(type => type.id + '' === id + '');
        if (storedType) {
            return storedType;
        }
        const loadedType = await this.http
            .get<ApiItemType>([this.baseUrl, id].join('/'))
            .toPromise();
        this.store.push(loadedType);
        return loadedType;
    }
}
