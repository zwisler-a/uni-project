import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldsService implements Resolve<string[]> {
  baseUrl = `${environment.baseUrl}/fields`;

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string[]> {
    const type = route.params['itemTypeId'];
    // return this.fields(type);
    return of(['id']);
  }

  fields(typeId?: Number) {
    return this.http.get<string[]>([this.baseUrl, typeId].join('/')).pipe(
      map((res: any) => {
        return res.fields;
      })
    );
  }
}
