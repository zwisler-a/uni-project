import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Item } from './types/item.interface';
import { TranslateService } from '@ngx-translate/core';
import { ApiItemType } from './types/api/api-item-type.interface';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    baseUrl = `${environment.baseUrl}/items`;

    constructor(
        private http: HttpClient,
        private snackbar: MatSnackBar,
        private translate: TranslateService
    ) {}

    /** Hier solltest du die pagination beachten */
    getItems(page: number, perPage: number, type?: string | number) {
        const params = new HttpParams();
        params.append('page', page.toString());
        params.append('per_page', perPage.toString());
        return this.http
            .get([this.baseUrl, type].join('/'), {
                observe: 'response',
                params: { page: page.toString(), per_page: perPage.toString() }
            })
            .pipe(
                catchError(err => {
                    // Do some always required error handling, like showing a snackbar if necessary
                    // rethrow the error
                    return throwError(err);
                })
            );
    }

    /**
     * Creates a new Entity
     * @param entity Entity to create
     */
    createItem(entity) {
        return this.http
            .post(`${this.baseUrl}/${entity.itemTypeId}`, entity)
            .pipe(
                catchError(err => {
                    this.translate
                        .get('items.error.list')
                        .subscribe(message => this.showError(message));
                    return throwError(err);
                })
            );
    }

    getItem(typeId: number, itemId: number) {
        return this.http.get(`${this.baseUrl}/${typeId}/${itemId}`).pipe(
            catchError(err => {
                this.translate
                    .get('items.error.get')
                    .subscribe(message => this.showError(message));
                return throwError(err);
            })
        );
    }

    updateItem(entity: Item) {
        return this.http
            .patch(`${this.baseUrl}/${entity.typeId}/${entity.id}`, entity)
            .pipe(
                catchError(err => {
                    this.translate
                        .get('items.error.update')
                        .subscribe(message => this.showError(message));
                    return throwError(err);
                })
            );
    }

    deleteItem(entity: Item) {
        return this.http
            .delete(`${this.baseUrl}/${entity.typeId}/${entity.id}`)
            .pipe(
                catchError(err => {
                    this.translate
                        .get('items.error.delete')
                        .subscribe(message => this.showError(message));
                    return throwError(err);
                })
            );
    }

    showError(message) {
        this.snackbar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'end'
        });
    }
}
