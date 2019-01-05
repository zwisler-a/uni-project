import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Item } from './types/item.interface';
import { CreatableItem } from './types/creatable-item.interface';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = `${environment.baseUrl}/items`;

  constructor(private http: HttpClient) {}

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
  createItem(entity: CreatableItem) {
    return this.http.post(`${this.baseUrl}/${entity.itemTypeId}`, entity).pipe(
      catchError(err => {
        // Do some always required error handling, like showing a snackbar if necessary
        // rethrow the error
        return throwError(err);
      })
    );
  }

  getItem(entity: Item) {
    return this.http
      .get(`${this.baseUrl}/${entity.itemTypeId}/${entity.id}`)
      .pipe(
        catchError(err => {
          // Do some always required error handling, like showing a snackbar if necessary
          // rethrow the error
          return throwError(err);
        })
      );
  }

  updateItem(entity: Item) {
    return this.http
      .patch(`${this.baseUrl}/${entity.itemTypeId}/${entity.id}`, entity)
      .pipe(
        catchError(err => {
          // Do some always required error handling, like showing a snackbar if necessary
          // rethrow the error
          return throwError(err);
        })
      );
  }

  deleteItem(entity: Item) {
    return this.http
      .delete(`${this.baseUrl}/${entity.itemTypeId}/${entity.id}`)
      .pipe(
        catchError(err => {
          // Do some always required error handling, like showing a snackbar if necessary
          // rethrow the error
          return throwError(err);
        })
      );
  }
}
