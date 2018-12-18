import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Entity } from './types/entity.interface';
import { CreatableEntity } from './types/creatable-entity.interface';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EntityService {
    baseUrl = `${environment.baseUrl}/entities`;

    constructor(private http: HttpClient) { }

    /** Hier solltest du die pagination beachten */
    allEntities(entityTypeId: number) {
        return this.http.get(`${this.baseUrl}/${entityTypeId}`).pipe(
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
    createEntity(entity: CreatableEntity) {
        return this.http.post(`${this.baseUrl}/${entity.entityTypeId}`, entity).pipe(
            catchError(err => {
                // Do some always required error handling, like showing a snackbar if necessary
                // rethrow the error
                return throwError(err);
            })
        );
    }

    getEntity(entity: Entity) {
        return this.http.get(`${this.baseUrl}/${entity.entityTypeId}/${entity.id}`).pipe(
            catchError(err => {
                // Do some always required error handling, like showing a snackbar if necessary
                // rethrow the error
                return throwError(err);
            })
        );
    }

    modifyEntity(entity: Entity) {
        return this.http.patch(`${this.baseUrl}/${entity.entityTypeId}/${entity.id}`, entity).pipe(
            catchError(err => {
                // Do some always required error handling, like showing a snackbar if necessary
                // rethrow the error
                return throwError(err);
            })
        );
    }

    deleteEntity(entity: Entity) {
        return this.http.delete(`${this.baseUrl}/${entity.entityTypeId}/${entity.id}`).pipe(
            catchError(err => {
                // Do some always required error handling, like showing a snackbar if necessary
                // rethrow the error
                return throwError(err);
            })
        );
    }

}
