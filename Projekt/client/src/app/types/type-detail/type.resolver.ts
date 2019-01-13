import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { TypesService } from '../types.service';
import { ApiItemType } from '../types/api-item-type.interface';

@Injectable({ providedIn: 'root' })
export class TypeResolver implements Resolve<ApiItemType> {
    constructor(private typesService: TypesService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ApiItemType> {
        const id = Number.parseInt(route.params.id, 10);
        return this.typesService.getType(id);
    }
}
