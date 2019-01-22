import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TypesService } from '../../stores/type-store/types.service';

@Injectable({ providedIn: 'root' })
export class TypesResolver implements Resolve<any> {
    constructor(private typesService: TypesService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.typesService.loadTypes();
    }
}
