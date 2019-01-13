import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiItemType } from './types/api-item-type.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TypesService {
    baseUrl = `${environment.baseUrl}/types`;
    store: ApiItemType[] = [];
    constructor(private http: HttpClient) {}

    getTypes() {
        return this.http.get<ApiItemType[]>(this.baseUrl).pipe(
            map(res => {
                this.store = res;
                return res;
            })
        );
    }

    getType(id: number): Observable<ApiItemType> {
        const storedType = this.store.find(type => type.id === id);
        console.log(id, this.store, storedType);
        if (storedType) {
            return of(storedType);
        }
        return this.http.get<ApiItemType>([this.baseUrl, id].join('/')).pipe(
            map(res => {
                this.store.push(res);
                return res;
            })
        );
    }

    createType(type: ApiItemType) {
        return this.http.post(this.baseUrl, this.transformType(type));
    }

    deleteType(id: number) {
        return this.http.delete([this.baseUrl, id].join('/')).pipe(
            map(res => {
                this.store = [];
                return res;
            })
        );
    }

    updateType(type: ApiItemType) {
        return this.http
            .patch([this.baseUrl, type.id].join('/'), this.transformType(type))
            .pipe(
                map(res => {
                    this.store = [];
                    return res;
                })
            );
    }

    private transformType(type: ApiItemType) {
        const fields = type.fields.map(field => ({
            name: field.name,
            type: field.type,
            unique: field.unique,
            required: field.required
        }));
        return { name: type.name, fields: fields };
    }
}
