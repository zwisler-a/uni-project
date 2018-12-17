import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class entityService {

  private baseUrl: string = `${process.env.BASE_URL} /entities/`;

  constructor(private http: HttpClient) { }

  allEntities(entityTypeId: number): Promise<Array<Entity>> {
    return this.http.get<Array<Entity>>(`${this.baseUrl}${entityTypeId}`).toPromise();
  }

  createEntity(entityTypeId: number) {

  }

  getEntity(entityTypeId: number, entityId: number) {

  }

  modifyEntity(entityTypeId: number, entityId: number) {

  }

  deleteEntity(entityTypeId: number, entityId: number) {

  }

  async test() {
    try {
      const response: HttpResponse<Array<Entity>> = await this.allEntities(0);
      console.log(response.body);
      if (response.status == 404) {
        console.error('entity type not found');
      }
    } catch (error) {
      console.error('connection problem', error);
    }
  }
}

export interface Entity {
  id: number;
  entityTypeId: number;
  companyId: number;
  fields: any;
}
