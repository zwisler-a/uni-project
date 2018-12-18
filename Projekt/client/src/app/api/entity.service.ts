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
export class ItemService {
    baseUrl = `${environment.baseUrl}/entities`;
    readonly apiUrls = {
        create: [this.baseUrl, 'create'].join('/')
    };

    constructor(private http: HttpClient) {}

    /** Hier solltest du die pagination beachten */
    allEntities(entityTypeId: number): Promise<Array<Entity>> {
        return this.http
            .get<Array<Entity>>(`${this.baseUrl}${entityTypeId}`)
            .toPromise();
    }

    /**
     * Creates a new Entity
     * @param entity Entity to create
     */
    createEntity(entity: CreatableEntity) {
        return this.http.post(this.apiUrls.create, entity).pipe(
            catchError(err => {
                // Do some always required error handling, like showing a snackbar if necessary
                // rethrow the error
                return throwError(err);
            })
        );
    }

    getEntity(entityTypeId: number, entityId: number) {}

    modifyEntity(entityTypeId: number, entityId: number) {}

    deleteEntity(entityTypeId: number, entityId: number) {}

    /*
  async test() {
    try {
      const response: HttpResponse<Array<Entity>> = await this.allEntities(0);
      console.log(response.body);
      if (response.status === 404) {
        console.error('entity type not found');
      }
    } catch (error) {
      console.error('connection problem', error);
    }
  }
  */
}
